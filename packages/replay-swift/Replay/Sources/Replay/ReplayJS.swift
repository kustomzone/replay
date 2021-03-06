import JavaScriptCore

typealias ReplayJsRuntime = JSContext

// The interface for dealing with JS files
class ReplayJS {
    // Returns the JS runtime with size and default font from game props
    static func getGameProps(customGameJsString: String?) -> (Size, TextureFont?, ReplayJsRuntime) {
        guard let context = JSContext() else { fatalError("Could not load JS context") }

        // Print errors that happen in JS runtime
        context.exceptionHandler = { _, error in
            let errorString = error?.toString() ?? "unknown"
            let stackTrace = error?.objectForKeyedSubscript("stack").toString() ?? "unknown"
            let lineNumber = error?.objectForKeyedSubscript("line")?.toString() ?? "unknown"
            let column = error?.objectForKeyedSubscript("column")?.toString() ?? "unknown"
            let moreInfo = "in method '\(stackTrace.replacingOccurrences(of: "\n", with: " <- "))', line \(lineNumber), column \(column)."
            print("JS error: \(errorString) \(moreInfo)")
        }

        if let customGameJsString = customGameJsString {
            context.evaluateScript(customGameJsString)
        } else {
            guard let gameJsPath = Bundle.main.path(forResource: "game", ofType: "js") else {
                fatalError("Couldn't load game.js file in Bundle")
            }

            guard let gameJsString = try? String(
                contentsOfFile: gameJsPath,
                encoding: String.Encoding.utf8
                ) else {
                    fatalError("Couldn't read JS file at path \(gameJsPath)")
            }
            
            // Set global variable 'Game' and 'gameProps' in JS context
            context.evaluateScript(gameJsString)
        }

        guard let gameSize = context
            .objectForKeyedSubscript("game")?
            .objectForKeyedSubscript("gameProps")?
            .objectForKeyedSubscript("size")?
            .toDictionary()
            else {
                fatalError("Could not load size prop of game")
        }

        let portraitSize = gameSize["portrait"]
        let landscapeSize = gameSize["landscape"]

        var size: Size!
        if let portraitSizeVal = portraitSize as? [AnyHashable: Any],
            let landscapeSizeVal = landscapeSize as? [AnyHashable: Any] {
            size = Size(
                portrait: extractOrientationSize(dict: portraitSizeVal),
                landscape: extractOrientationSize(dict: landscapeSizeVal)
            )
        } else {
            let orientationSize = extractOrientationSize(dict: gameSize)
            size = Size(portrait: orientationSize, landscape: orientationSize)
        }

        let defaultFontObj = context
            .objectForKeyedSubscript("game")?
            .objectForKeyedSubscript("gameProps")?
            .objectForKeyedSubscript("defaultFont")?
            .toDictionary()

        var defaultFont: TextureFont?
        if let fontName = defaultFontObj?["name"] as? String,
            let fontSize = defaultFontObj?["size"] as? NSNumber {
            defaultFont = TextureFont(name: fontName, size: CGFloat(truncating: fontSize))
        }

        return (size, defaultFont, context)
    }

    // Get textures from the Replay runtime
    static func getTextures(platform: ReplayPlatform, replayJsRuntime context: ReplayJsRuntime, deviceSize: DeviceSize) -> ([ReplayTexture], (Double) -> [ReplayTexture]) {
        // Set variable 'replay' in JS context
        context.evaluateScript(replayCoreJsString)

        // Get the JS 'replayCore' function from 'replay' var
        let replayCore = context
            .objectForKeyedSubscript("replay")!
            .objectForKeyedSubscript("replayCore")!

        let replayCoreReturnObj = replayCore.call(withArguments: [platform])!

        let initTextures = parseTextures(
            replayCoreReturnObj.objectForKeyedSubscript("initTextures")!.toArray()!,
            deviceSize: deviceSize
        )

        let getNextFrameTexturesCallback = replayCoreReturnObj
            .objectForKeyedSubscript("getNextFrameTextures")!

        func getNextFrameTextures(timeMs: Double) -> [ReplayTexture] {
            let timeMsJs = NSNumber(value: timeMs)
            return parseTextures(
                getNextFrameTexturesCallback
                    .call(withArguments: [timeMsJs])!
                    .toArray()!,
                deviceSize: deviceSize
            )
        }

        return (initTextures, getNextFrameTextures)
    }

    private static func parseTextures(_ textures: [Any], deviceSize: DeviceSize) -> [ReplayTexture] {
        return textures.map { texture in
            let dict = texture as! NSDictionary
            let type = dict.value(forKey: "type") as! NSString
            let propsDict = dict.value(forKey: "props") as! NSDictionary
            let positionDict = propsDict.value(forKey: "position") as! NSDictionary
            let x = positionDict.value(forKey: "x") as! NSNumber
            let y = positionDict.value(forKey: "y") as! NSNumber
            let rotation = positionDict.value(forKey: "rotation") as! NSNumber
            let opacity = propsDict.value(forKey: "opacity") as? NSNumber
            let scaleX = propsDict.value(forKey: "scaleX") as? NSNumber
            let scaleY = propsDict.value(forKey: "scaleY") as? NSNumber
            let anchorX = propsDict.value(forKey: "anchorX") as? NSNumber
            let anchorY = propsDict.value(forKey: "anchorY") as? NSNumber

            let baseProps = BaseProps(
                x: SizeUtils.gameXToDeviceX(x: x, deviceSize: deviceSize),
                y: SizeUtils.gameYToDeviceY(y: y, deviceSize: deviceSize),
                rotation: CGFloat(truncating: rotation),
                opacity: CGFloat(truncating: opacity ?? 1),
                scaleX: CGFloat(truncating: scaleX ?? 1),
                scaleY: CGFloat(truncating: scaleY ?? 1),
                anchorX: CGFloat(truncating: anchorX ?? 0),
                anchorY: CGFloat(truncating: anchorY ?? 0)
            )

            switch type {
            case "rectangle":
                let width = propsDict.value(forKey: "width") as! NSNumber
                let height = propsDict.value(forKey: "height") as! NSNumber
                let color = propsDict.value(forKey: "color") as! String
                let rectProps = RectangleProps(
                    width: CGFloat(truncating: width),
                    height: CGFloat(truncating: height),
                    color: color
                )
                return .rectangle(baseProps, rectProps)

            case "text":
                let fontDict = propsDict.value(forKey: "font") as? NSDictionary
                let fontName = fontDict?.value(forKey: "name") as? String
                let fontSize = fontDict?.value(forKey: "size") as? NSNumber
                let font: TextureFont? = fontName == nil || fontSize == nil
                    ? nil
                    : TextureFont(name: fontName!, size: CGFloat(truncating: fontSize!))

                let textProps = TextProps(
                    font: font,
                    text: propsDict.value(forKey: "text") as! String,
                    color: propsDict.value(forKey: "color") as! String
                )
                return .text(baseProps, textProps)

            case "circle":
                let radius = propsDict.value(forKey: "radius") as! NSNumber
                let color = propsDict.value(forKey: "color") as! String
                let circleProps = CircleProps(
                    radius: CGFloat(truncating: radius),
                    color: color
                )
                return .circle(baseProps, circleProps)

            case "line":
                let thickness = propsDict.value(forKey: "thickness") as! NSNumber
                let color = propsDict.value(forKey: "color") as! String
                let path = (propsDict.value(forKey: "path") as! [[NSNumber]])
                    .map({ (xyJsTuple) -> CGPoint in
                        let x = Double(truncating: xyJsTuple[0])
                        let y = Double(truncating: xyJsTuple[1])
                        return CGPoint(x: x, y: y)
                    })
                let lineProps = LineProps(
                    thickness: CGFloat(truncating: thickness),
                    color: color,
                    path: path
                )
                return .line(baseProps, lineProps)

            case "image":
                let fileName = propsDict.value(forKey: "fileName") as! String
                let width = propsDict.value(forKey: "width") as! NSNumber
                let height = propsDict.value(forKey: "height") as! NSNumber
                let imageProps = ImageProps(
                    fileName: fileName,
                    width: CGFloat(truncating: width),
                    height: CGFloat(truncating: height)
                )
                return .image(baseProps, imageProps)

            case "spriteSheet":
                let fileName = propsDict.value(forKey: "fileName") as! String
                let columns = propsDict.value(forKey: "columns") as! NSNumber
                let rows = propsDict.value(forKey: "rows") as! NSNumber
                let index = propsDict.value(forKey: "index") as! NSNumber
                let width = propsDict.value(forKey: "width") as! NSNumber
                let height = propsDict.value(forKey: "height") as! NSNumber
                let spriteSheetProps = SpriteSheetProps(
                    fileName: fileName,
                    columns: CGFloat(truncating: columns),
                    rows: CGFloat(truncating: rows),
                    index: CGFloat(truncating: index),
                    width: CGFloat(truncating: width),
                    height: CGFloat(truncating: height)
                )
                return .spriteSheet(baseProps, spriteSheetProps)

            default:
                fatalError("Unimplemented texture type \(type)")
            }
        }
    }
    
    private static func extractOrientationSize(dict: [AnyHashable: Any]) -> OrientationSize {
        guard let width = dict["width"] as? NSNumber,
            let height = dict["height"] as? NSNumber
            else { fatalError("Couldn't load width and height of game") }

        let minWidthXL = dict["minWidthXL"] as? NSNumber
        let minHeightXL = dict["minWidthXL"] as? NSNumber

        let maxWidthMargin = dict["maxWidthMargin"] as? NSNumber ?? NSNumber(value: 0)
        let maxHeightMargin = dict["maxHeightMargin"] as? NSNumber ?? NSNumber(value: 0)

        return OrientationSize(
            width: CGFloat(truncating: width),
            height: CGFloat(truncating: height),
            minWidthXL: minWidthXL == nil ? nil : CGFloat(truncating: minWidthXL!),
            minHeightXL: minHeightXL == nil ? nil : CGFloat(truncating: minHeightXL!),
            maxWidthMargin: CGFloat(truncating: maxWidthMargin),
            maxHeightMargin: CGFloat(truncating: maxHeightMargin)
        )
    }
}
