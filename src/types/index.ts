export type Role = 'user' | 'assistant' | 'system'

export type Message = {
    role: Role
    content: string
}
export type MessageList = Message[]

export type ENWord = {
    word: string // 词
    content: string // 返回的数据
}
export type ENWordStorageType = {
    [key: string]: ENWord[]
}

export type ModelType = 'gpt-3.5-turbo-0613' | 'gpt-3.5-turbo-16k' | 'gpt-3.5-turbo-0301'
