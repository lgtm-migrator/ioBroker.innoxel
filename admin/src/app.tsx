import React from "react";
import withStyles from "@mui/styles/withStyles";
import type { Theme } from "@mui/material/styles";

import GenericApp from "@iobroker/adapter-react-v5/GenericApp";
import Settings from "./components/settings";
import type { GenericAppProps, GenericAppSettings } from "@iobroker/adapter-react-v5/types";
import type { StyleRules } from "@mui/styles";

const styles = (_theme: Theme): StyleRules => ({
    root: {},
});

class App extends GenericApp {
    constructor(props: GenericAppProps) {
        const extendedProps: GenericAppSettings = {
            ...props,
            // encryptedFields: ["password"],  <-- don't add encryptedFields here that are already specified in io-package.json as encryptedNative
            translations: {
                en: require("./i18n/en.json"),
                de: require("./i18n/de.json"),
                ru: require("./i18n/ru.json"),
                pt: require("./i18n/pt.json"),
                nl: require("./i18n/nl.json"),
                fr: require("./i18n/fr.json"),
                it: require("./i18n/it.json"),
                es: require("./i18n/es.json"),
                pl: require("./i18n/pl.json"),
                "zh-cn": require("./i18n/zh-cn.json"),
            },
        };
        super(props, extendedProps);
    }

    onConnectionReady(): void {
        // executed when connection is ready
    }

    render() {
        if (!this.state.loaded) {
            return super.render();
        }

        return (
            <div className="App">
                <Settings native={this.state.native} onChange={(attr, value) => this.updateNativeValue(attr, value)} />
                {this.renderError()}
                {this.renderToast()}
                {this.renderSaveCloseButtons()}
            </div>
        );
    }
}

export default withStyles(styles)(App);
