import React from "react";
import {
    FontWeights,
    IStackStyles,
    IStackTokens,
    ITextStyles,
    Stack,
    Text,
} from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import logo from "./Diana.png";
import { CustomTopBar } from "./header";
import "./welcome.css";

const boldStyle: Partial<ITextStyles> = {
    root: { fontWeight: FontWeights.semibold },
};
const mainStackTokens: IStackTokens = { childrenGap: 15 };
const mainStackStyles: Partial<IStackStyles> = {
    root: {
        width: "50%",
        height: "90%",
        margin: "0 auto",
        marginTop: "0px",
        textAlign: "center",
        color: "#605e5c",
    },
};

export function Welcome() {
    return (
        <span>
            <CustomTopBar />
            {/*<span className="topAlign">*/}
            <Stack
                className="topAlign"
                horizontalAlign="center"
                verticalAlign="center"
                verticalFill
                styles={mainStackStyles}
                tokens={mainStackTokens}
            >
                <img className="App-logo" src={logo} alt="logo" />
                <Text variant="xxLarge" styles={boldStyle}>
                    欢迎来到<a href={"/search"}>asoul-au.live</a>
                </Text>
                <Text variant="large">
                    为au们搭建了个站点
                    <br />
                    记住，嘉心糖都是很厉害的人哦
                </Text>
                <Text variant="large" styles={boldStyle}>
                    相关链接
                </Text>
                <Stack
                    horizontal
                    tokens={mainStackTokens}
                    horizontalAlign="center"
                >
                    <DefaultButton text="文档">文档</DefaultButton>
                    <DefaultButton
                        text="B站"
                        href={"https://space.bilibili.com/1177242804"}
                        target="_blank"
                        rel="noopener"
                    >
                        B站
                    </DefaultButton>
                    {/*<DefaultButton text="Twitter">Twitter</DefaultButton>*/}
                    <PrimaryButton
                        text="Github"
                        href={"https://github.com/Asoul-au"}
                        target="_blank"
                        rel="noopener"
                    >
                        Github
                    </PrimaryButton>
                </Stack>
                <Text variant="large" styles={boldStyle}>
                    技术支持：
                </Text>
                <Stack
                    horizontal
                    tokens={mainStackTokens}
                    horizontalAlign="center"
                >
                    <DefaultButton text="并不存在的阿草">
                        并不存在的阿草
                    </DefaultButton>
                    <PrimaryButton text="很厉害的一个魂儿">
                        很厉害的一个魂儿
                    </PrimaryButton>
                </Stack>
            </Stack>
            {/*</span>*/}
        </span>
    );
}
