import express, { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import fs from "node:fs/promises";
import { Buffer } from 'node:buffer';




export const byPupeteer = async (req: Request, res: Response) => {
    const output = __dirname + "/output/chaldal.html"
    const url = "https://chaldal.com/fresh-vegetable";

    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const element = await page.evaluate(() => {
        // executed in the browser
        return document.querySelector("h1");
    });



    if (element) {
        await fs.writeFile(output, element.innerHTML)
        res.send(element.innerHTML)
    }
    await browser.close();

}