export type Role = 'user' | 'assistant' | 'system'

export type Message = {
    role: Role
    content: string
}
export type MessageList = Message[]

export type ENWord = {
    word: string // 词
    // partOfSpeech: string // 词性
    // phonetics: string // 音标
    // chDefinition: string // 中文释义
    // enDefinition: string // 英文释义
    // example: string // 场景例句
    content: string // 返回的数据
}
export type ENWordStorageType = {
    [key: string]: ENWord[]
}

export type ModelType = 'gpt-3.5-turbo-0613' | 'gpt-3.5-turbo-16k' | 'gpt-3.5-turbo-0301'
