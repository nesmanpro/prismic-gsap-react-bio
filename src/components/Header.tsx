import React from "react";
import { createClient } from "@/prismicio";
import NavBar from "./NavBar";

export default async function Header() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <header className="top-0 pt-12 z-50 m-auto mx-8 max-w-7xl md:sticky md:top-5 xl:mx-auto">
            <NavBar settings={settings} />
        </header>
    );
}
