import * as React from "react";
import {
    CommandBar,
    ICommandBarItemProps,
} from "@fluentui/react/lib/CommandBar";
import {
    IButtonProps,
//    IButtonStyles,
} from "@fluentui/react/lib/Button";
import { DirectionalHint } from "@fluentui/react/lib/Callout";
import {
    ContextualMenuItem,
    IContextualMenuItemProps,
    IContextualMenuItemStyles,
    IContextualMenuStyles,
} from "@fluentui/react/lib/ContextualMenu";
import { getTheme } from "@fluentui/react/lib/Styling";
//import { memoizeFunction } from "@fluentui/react/lib/Utilities";
import "./header.css";

const theme = getTheme();
const itemStyles: Partial<IContextualMenuItemStyles> = {
    label: { fontSize: 18 },
    icon: { color: theme.palette.blue },
    iconHovered: { color: theme.palette.blue },
};

const menuStyles: Partial<IContextualMenuStyles> = {
    subComponentStyles: { menuItem: itemStyles, callout: {} },
};

//const getCommandBarButtonStyles = memoizeFunction(
//    (
//        originalStyles: IButtonStyles | undefined
//    ): Partial<IContextualMenuItemStyles> => {
//        if (!originalStyles) {
//            return itemStyles;
//        }
//        return concatStyleSets(originalStyles, itemStyles);
//    }
//);

// const CustomButton: React.FunctionComponent<IButtonProps> = (props) => {
//     // const buttonOnMouseClick = () => alert(`${props.text} clicked`);
//     // return (
//     //     <CommandBarButton
//     //         {...props}
//     //         onClick={buttonOnMouseClick}
//     //         styles={getCommandBarButtonStyles(props.styles)}
//     //     />
//     // );
// };

const CustomMenuItem: React.FunctionComponent<IContextualMenuItemProps> = (
    props
) => {
    return <ContextualMenuItem {...props} />;
};

const overflowProps: IButtonProps = {
    ariaLabel: "More commands",
    menuProps: {
        contextualMenuItemAs: CustomMenuItem,
        styles: menuStyles,
        items: [],
        isBeakVisible: true,
        beakWidth: 20,
        gapSpace: 10,
        directionalHint: DirectionalHint.topCenter,
    },
};

export function CustomHeader() {
    return (
        <div><h1>Asoul-Comment</h1></div>
    );
}

export function CustomTopBar() {
    return (
        <CommandBar
            className="topRightAlign"
            overflowButtonProps={overflowProps}
            // buttonAs={CustomButton}
            items={_items}
            overflowItems={_overflowItems}
            farItems={_farItems}
            ariaLabel="Use left and right arrow keys to navigate between commands"
        />
    );
}

const _items: ICommandBarItemProps[] = [
    {
        key: "newItem",
        text: "????????????",
        iconProps: { iconName: "Add" },
        subMenuProps: {
            contextualMenuItemAs: CustomMenuItem,
            styles: menuStyles,
            items: [
                {
                    key: "newPost",
                    text: "????????????",
                    iconProps: { iconName: "OpenEnrollment" },
                },
                {
                    key: "newQuestion",
                    text: "????????????",
                    iconProps: { iconName: "QandA" },
                },
            ],
        },
    },
    {
        key: "search",
        text: "????????????",
        iconProps: { iconName: "Search" },
        href: process.env.PUBLIC_URL + "/search",
    },
    {
        key: "share",
        text: "??????",
        iconProps: {
            iconName: "Share",
        },
        href: process.env.PUBLIC_URL + "/share",
        onClick: () => console.log("Share"),
    },
    {
        key: "feedback",
        text: "????????????",
        iconProps: { iconName: "Mail" },
        onClick: () => console.log("Download"),
    },
];

const _overflowItems: ICommandBarItemProps[] = [
    {
        key: "about",
        text: "????????????",
        iconProps: { iconName: "ContactLink" },
    },
    {
        key: "copyright",
        text: "????????????",
        iconProps: { iconName: "InfoSolid" },
    },
];

const _farItems: ICommandBarItemProps[] = [
    {
        key: "info",
        text: "??????",
        ariaLabel: "??????",
        iconOnly: true,
        href: "/welcome",
        iconProps: { iconName: "Info" },
    },
];
