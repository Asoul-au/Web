import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./index/welcome";
import { Search } from "./search/search";
import { mergeStyles } from "@fluentui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();

mergeStyles({
    ":global(body,html,#root)": {
        margin: 0,
        padding: 0,
        height: "100vh",
    },
});

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}>
        <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<Search />} />
        </Routes>
    </Router>,
    document.getElementById("root")
);
