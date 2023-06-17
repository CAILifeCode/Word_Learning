import { ENWord } from '@/types'
import { EN_WORD_PROMPT } from '@/constants/prompt'

/**
 * 判断是否为英文单词
 * @param word
 */
export function handleCheckIsEnglishWord(word: string) {
    const reg = /^[a-zA-Z]+$/
    return reg.test(word)
}

/**
 * 将英文单词转换为CSV格式
 * @param data
 */
function convertToCSV(data: ENWord[]) {
    const headers = Object.keys(data[0]).join(',')
    const rows = data
        .map((row) => {
            return Object.values(row)
                .map((value) => `"${value}"`)
                .join(',')
        })
        .join('\n')

    return `${headers}\n${rows}`
}

/**
 * 下载CSV文件
 * @param data
 * @param fileName
 */
export function downloadCSV(data: ENWord[], fileName = 'data.csv') {
    const csvData = convertToCSV(data)
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8' })

    const downloadLink = document.createElement('a')
    downloadLink.href = URL.createObjectURL(csvBlob)
    downloadLink.download = fileName

    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
}

/**
 * 判断是否为正确的url地址
 * @param url
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url)
        return true
    } catch (e) {
        return false
    }
}

/**
 * 创建英文单词 Prompt
 * @param word
 */
export function generateENWordPrompt(word: string): string {
    return `
    ${EN_WORD_PROMPT}
    单词是 ${word}`
}
