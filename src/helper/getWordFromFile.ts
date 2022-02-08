import { readFileSync } from "fs";

export const getWordFromFile = () => {
    return readFileSync("src/resources/words.txt").toString().split("\n");
};
