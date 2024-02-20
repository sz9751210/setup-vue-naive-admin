module.exports = {
    // 指定每行結尾使用的換行符。"lf" 代表只使用換行符（Linux 和 macOS 標準），相對於 "crlf"（Windows 標準）。
    endOfLine: "lf",

    // 設置格式化代碼時每行的最大字符數。超過這個數字，Prettier 會嘗試換行。
    printWidth: 120,

    // 使用單引號代替雙引號。這對於 JavaScript、TypeScript、JSON 等語言的字符串定義來說是一個風格選擇。
    singleQuote: true,

    // 在語句末尾不加分號。在 JavaScript 中，大多數情況下分號是可選的，這是一種風格選擇。
    semi: false
}
