# ✋ Hands Project

> An interactive p5.js + MediaPipe Hands + Matter.js playground where colorful circles react to hand movement.

---

## 🖼 Preview

![App Preview](media/hands-preview.gif)

---

## ⚙️ Getting Started

These instructions will get your project running locally.

```bash
# 1. Clone the repo
git clone https://github.com/suzubu/hands.git

# 2. Navigate into the project folder
cd hands

# 3. Install dependencies
npm install

# 4. Run the app
npm run dev
```

> Built with:  
> - [p5.js](https://p5js.org/)  
> - [MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)  
> - [Matter.js](https://brm.io/matter-js/)  
> - [Vite](https://vitejs.dev/)

---

## ✨ Features

- 🖐️ Real-time hand tracking via webcam  
- 🎨 Interactive glassy circles that react to hand gestures  
- ⚡ Physics simulation with Matter.js  
- 🌗 Toggle between interaction modes (gather, repel, attract)  

---

## 💡 Dev Notes

- p5.js used for rendering and UI  
- MediaPipe Hands for detecting hand landmarks  
- Matter.js manages the circle physics  
- Custom UI controls stored in `components/uiControls.js`  
- Designed for modular clarity with folders for physics, graphics, render, utils, and store  

---

## 📚 Inspiration / Credits

This project was inspired by:  
- @costardrouge.jpg
- Interactive media art and coding playgrounds  
- Google’s MediaPipe demos  
- Creative coding influences like Daniel Shiffman’s *Coding Train*  

---

## 🧪 Known Issues

- ❌ Performance may lag on lower-end devices  
- 🔍 Some hand gestures may be misinterpreted in poor lighting  

---

## 🔭 Roadmap / TODO

- [ ] Add color customization for circles  
- [ ] Expand interaction types (e.g., swirl, magnetize)  
- [ ] Improve mobile responsiveness  
- [ ] Export canvas snapshots  

---

```bash
hands_project/
    hands/
        index.html
        .DS_Store
        .gitignore
        package-lock.json
        package.json
        structure.txt
        node_modules/
            .DS_Store
            .package-lock.json
            tinyglobby/
                LICENSE
                README.md
                package.json
                dist/
                    index.d.mts
                    index.js
                    index.mjs
                    index.d.ts
            @types/
                estree/
                    LICENSE
                    README.md
                    flow.d.ts
                    package.json
                    index.d.ts
            .bin/
                nanoid
                vite
                rollup
                esbuild
            nanoid/
                LICENSE
                index.d.cts
                index.browser.js
                index.js
                README.md
                package.json
                index.browser.cjs
                index.cjs
                nanoid.js
                index.d.ts
                bin/
                    nanoid.cjs
                async/
                    index.browser.js
                    index.js
                    package.json
                    index.browser.cjs
                    index.cjs
                    index.native.js
                    index.d.ts
                non-secure/
                    index.js
                    package.json
                    index.cjs
                    index.d.ts
                url-alphabet/
                    index.js
                    package.json
                    index.cjs
            picomatch/
                LICENSE
                index.js
                README.md
                posix.js
                package.json
                lib/
                    constants.js
                    parse.js
                    picomatch.js
                    utils.js
                    scan.js
            postcss/
                LICENSE
                README.md
                package.json
                lib/
                    postcss.js
                    rule.d.ts
                    lazy-result.d.ts
                    stringifier.js
                    stringify.js
                    css-syntax-error.js
                    previous-map.d.ts
                    postcss.d.mts
                    result.d.ts
                    at-rule.js
                    declaration.js
                    parse.d.ts
                    warning.js
                    processor.js
                    previous-map.js
                    fromJSON.js
                    input.d.ts
                    at-rule.d.ts
                    stringifier.d.ts
                    map-generator.js
                    comment.d.ts
                    declaration.d.ts
                    processor.d.ts
                    list.js
                    warn-once.js
                    lazy-result.js
                    postcss.mjs
                    comment.js
                    postcss.d.ts
                    container.d.ts
                    stringify.d.ts
                    document.d.ts
                    node.js
                    parse.js
                    root.js
                    fromJSON.d.ts
                    list.d.ts
                    no-work-result.d.ts
                    tokenize.js
                    rule.js
                    css-syntax-error.d.ts
                    symbols.js
                    no-work-result.js
                    result.js
                    terminal-highlight.js
                    warning.d.ts
                    container.js
                    parser.js
                    node.d.ts
                    root.d.ts
                    input.js
                    document.js
            @rollup/
                rollup-darwin-arm64/
                    README.md
                    rollup.darwin-arm64.node
                    package.json
            @mediapipe/
                tasks-vision/
                    vision_bundle.mjs.map
                    vision.d.ts
                    README.md
                    package.json
                    vision_bundle.cjs.map
                    vision_bundle.cjs
                    vision_bundle.mjs
                    wasm/
                        vision_wasm_nosimd_internal.wasm
                        vision_wasm_nosimd_internal.js
                        vision_wasm_internal.wasm
                        vision_wasm_internal.js
            fdir/
                LICENSE
                README.md
                package.json
                dist/
                    types.js
                    types.d.ts
                    index.d.mts
                    index.d.cts
                    index.js
                    utils.d.ts
                    index.cjs
                    index.mjs
                    utils.js
                    index.d.ts
                    api/
                        walker.js
                        sync.js
                        queue.js
                        sync.d.ts
                        counter.d.ts
                        async.js
                        queue.d.ts
                        counter.js
                        walker.d.ts
                        async.d.ts
                        functions/
                            invoke-callback.d.ts
                            push-directory.js
                            get-array.js
                            group-files.js
                            walk-directory.js
                            resolve-symlink.d.ts
                            invoke-callback.js
                            walk-directory.d.ts
                            group-files.d.ts
                            push-directory.d.ts
                            resolve-symlink.js
                            join-path.js
                            push-file.d.ts
                            push-file.js
                            join-path.d.ts
                            get-array.d.ts
                    builder/
                        api-builder.d.ts
                        index.js
                        index.d.ts
                        api-builder.js
            picocolors/
                LICENSE
                types.d.ts
                picocolors.js
                README.md
                package.json
                picocolors.browser.js
                picocolors.d.ts
            vite/
                LICENSE.md
                README.md
                package.json
                client.d.ts
                misc/
                    true.js
                    false.js
                types/
                    hmrPayload.d.ts
                    hot.d.ts
                    metadata.d.ts
                    customEvent.d.ts
                    importGlob.d.ts
                    package.json
                    importMeta.d.ts
                    import-meta.d.ts
                    internal/
                        lightningcssOptions.d.ts
                        cssPreprocessorOptions.d.ts
                        terserOptions.d.ts
                bin/
                    openChrome.applescript
                    vite.js
                dist/
                    node/
                        constants.js
                        module-runner.js
                        moduleRunnerTransport-BWUZBVLX.d.ts
                        index.js
                        module-runner.d.ts
                        cli.js
                        index.d.ts
                        chunks/
                            dep-DcjhO6Jt.js
                            dep-Ctugieod.js
                            dep-BO5GbxpL.js
                            dep-Drtntmtt.js
                            dep-BpPEUsd2.js
                            dep-DmY5m86w.js
                            dep-CmzxWWz4.js
                            dep-Ck0J6tA7.js
                            dep-BHkUv4Z8.js
                            dep-PzytSxfE.js
                            dep-Bg9-PZ8I.js
                    client/
                        client.mjs
                        env.mjs
            rollup/
                LICENSE.md
                README.md
                package.json
                dist/
                    parseAst.d.ts
                    native.js
                    rollup.js
                    parseAst.js
                    rollup.d.ts
                    getLogFilter.d.ts
                    loadConfigFile.d.ts
                    loadConfigFile.js
                    getLogFilter.js
                    bin/
                        rollup
                    shared/
                        watch-cli.js
                        rollup.js
                        parseAst.js
                        index.js
                        fsevents-importer.js
                        watch.js
                        loadConfigFile.js
                    es/
                        rollup.js
                        parseAst.js
                        package.json
                        getLogFilter.js
                        shared/
                            parseAst.js
                            watch.js
                            node-entry.js
            esbuild/
                LICENSE.md
                README.md
                package.json
                install.js
                bin/
                    esbuild
                lib/
                    main.d.ts
                    main.js
            .vite/
                deps/
                    _metadata.json
                    matter-js.js
                    package.json
                    matter-js.js.map
            fsevents/
                fsevents.node
                LICENSE
                fsevents.js
                fsevents.d.ts
                README.md
                package.json
            source-map-js/
                LICENSE
                README.md
                package.json
                source-map.js
                source-map.d.ts
                lib/
                    source-map-generator.d.ts
                    source-map-consumer.js
                    quick-sort.js
                    util.js
                    source-node.d.ts
                    source-map-consumer.d.ts
                    base64-vlq.js
                    mapping-list.js
                    binary-search.js
                    base64.js
                    array-set.js
                    source-node.js
                    source-map-generator.js
            @esbuild/
                darwin-arm64/
                    README.md
                    package.json
                    bin/
                        esbuild 2
                        esbuild
            matter-js/
                LICENSE
                CHANGELOG.md
                README.md
                package.json
                build/
                    matter.min.js
                    matter.js
                src/
                    core/
                        Events.js
                        Sleeping.js
                        Runner.js
                        Matter.js
                        Common.js
                        Engine.js
                        Mouse.js
                        Plugin.js
                    module/
                        main.js
                        license.js
                    body/
                        World.js
                        Body.js
                        Composite.js
                    render/
                        Render.js
                    geometry/
                        Vector.js
                        Vertices.js
                        Axes.js
                        Bounds.js
                        Svg.js
                    factory/
                        Bodies.js
                        Composites.js
                    constraint/
                        Constraint.js
                        MouseConstraint.js
                    collision/
                        Pairs.js
                        Collision.js
                        Grid.js
                        Detector.js
                        Query.js
                        Contact.js
                        Pair.js
                        SAT.js
                        Resolver.js
        public/
        .git/
            .DS_Store
            ORIG_HEAD
            config
            HEAD
            description
            index
            COMMIT_EDITMSG
            FETCH_HEAD
            objects/
                61/
                    b4752c85a3ab1711f03cda50c9ff1d7c3b86d3
                59/
                    b41ea1694c0bff24f6b590a60ea2b9a409bc13
                    fcc4e51c913b88ed5a33f0395629b4a9bbc6da
                9e/
                    5b15a03e911cde88f2f5be0f4fa24aca268b1d
                32/
                    cacddbe5c8962a358f85f3b128285b876a9754
                67/
                    f01c70c04c0eeacacee8241fd0b8f5beeecace
                    0992b750242adf209bd801f5ae27f2877d4ec5
                ac/
                    406c6fb8f8ef272271797e19cc1323e9beaa61
                b3/
                    337469ec8a32479c3a812c7b683f153d735923
                a5/
                    47bf36d8d11a4f89c59c144f24795749086dd1
                d6/
                    72409117879c1f8024ee97ca80e0a59f75e100
                bc/
                    d348b5769db84aeabb45c152319b1b8da5a4e5
                f5/
                    db578476fb2d64f329058420df0eec948b4071
                4e/
                    2251d64ed7c0d89c94d384db7a49a2c2de2728
                4b/
                    4bcc26973d4f7b98a4af911f0d1eede0cf0146
                pack/
                89/
                    6188d02984290730962c82879924f757464be4
                8a/
                    1e8d3aebd581f7d92ebf6289c611f8ddb71119
                4c/
                    b410528b2c014efb43fe893bc7ffc515eb293a
                26/
                    0d3db1eb146ae7aa7b2e5ffd7fa0f142f6cece
                21/
                    3134a917653823abe78c9cc893b95776bc06e8
                75/
                    72578461fd912bee8baf196e06b31c9c4c7104
                2f/
                    6a86217aa33394d4a42274d2dd62dcca388742
                6b/
                    27b382cec6315d10de9ad9e55200d45a90c073
                9a/
                    96032e17e112efeff60501f07242baba2fb01b
                    acdbab28171082f28b06da1cd0f4ff798b9a49
                info/
                3a/
                    1475164ed3d78e877769fcf4206532c75121d8
                54/
                    d3ba397a048bf60e1c2c23c9f1681713dd15b8
                5b/
                    d9286824fd373752cdf4cac5afec391f26efcd
                37/
                    1b5cf6f2f1a2b87b2cf9bf9e17cbca907f015d
                06/
                    45d015f0bf9de9b9e9b1c88f07117fac8c634a
                0f/
                    b25227548a78484563d33fff1364df906a8374
                d5/
                    122b2e1f909560bc606a23e8597258af77f69e
                af/
                    b0e3630c647eccdcd1e0a4cebaee2a0509c8c3
                db/
                    8573055b847909471c8e8a1a57cee5fdc10f60
                    ec512bc3ba425e2ae2720890b848336d843cef
                b9/
                    ef21c21c9dbb12b524903543826c52db2e251a
                e1/
                    8832f5d878a47b83ef0356584ea1769955668d
                cc/
                    a57b36a8a657300997050dae1d747750b52912
                f9/
                    407f094e755f4b89f9a7e950ae5b581cceba7e
                f0/
                    a6244bf9abf392a720c8bbb17e01dfe05ca025
                c5/
                    3fcc4a799bffe242f770280665590076afa719
                c2/
                    9c4e2418061a52ab8bbebe2e1d0ecb2a270aea
                e7/
                    5ff1949a549736a69ee332e0dc46cce539d6a4
                f8/
                    c76d645b58f823d8af4c1de080abe86ab70aef
                ce/
                    176ef18d2b1431c2a2a625e0a792b684d76c1c
                83/
                    8fae85c882ba14eb1cfae90e2133736e057977
                    1800682da6acdef232f1e14bc0dd2ab1e65696
                70/
                    4f1895f27a20e7440dd3d973e0e1a9368d5273
                23/
                    aa72b56096ec6925798f4abd8f0858babba335
                8c/
                    4bf8623fac6fcb03a2d38c49887e48d2b0d12d
                85/
                    682a004c030a476300f35dfcf3c21e6e268aae
                1d/
                    b75a7a4313a2f5596136dc64e173bbed960e23
                82/
                    d2ef89fbdebdeb915c9a8b6500ed090f532ee2
                40/
                    3fac99f6e931bb51a53b4c6ea0c193268c01e1
                8b/
                    62ee96ec4e78e59886ce4b6614c32cb3500955
                13/
                    5168b7ff99e0ff5a71b658b5eac4af07e3b1ce
                7f/
                    4b588a17d72706b35398ef4b6b41ecd06bae4e
                22/
                    918f744b44da27e40e79f045aad414f95fff6e
            info/
                exclude
            logs/
                HEAD
                refs/
                    heads/
                        main
                    remotes/
                        origin/
                            HEAD
                            main
            hooks/
                commit-msg.sample
                pre-rebase.sample
                sendemail-validate.sample
                pre-commit.sample
                applypatch-msg.sample
                fsmonitor-watchman.sample
                pre-receive.sample
                prepare-commit-msg.sample
                post-update.sample
                pre-merge-commit.sample
                pre-applypatch.sample
                pre-push.sample
                update.sample
                push-to-checkout.sample
            refs/
                heads/
                    main
                tags/
                remotes/
                    origin/
                        HEAD
                        main
        src/
            .DS_Store
            main.js
            style.css
            sketch.js
            render/
                drawCircles.js
            utils/
                drawingStyles.js
                colors.js
            components/
                uiControls.js
            physics/
                circles.js
                boundaries.js
                matterSetup.js
                engine.js
            graphics/
                hands.js
            store/
                settings.js
    __MACOSX/
        ._hands
        hands/
            ._.DS_Store
            node_modules/
                ._.DS_Store
            .git/
                ._.DS_Store
                ._config
                ._index
                ._FETCH_HEAD
            src/
                ._.DS_Store
```

---

## 📜 License

MIT — feel free to use and adapt!

---

## 🙋‍♀️ Author

Made with ☕ + 🎧 by [suzubu](https://github.com/suzubu)  
