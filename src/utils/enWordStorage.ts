import { EN_WORD_STORE } from '@/constants'
import { ENWordStorageType, ENWord } from '@/types'
import { getLocal, setLocal } from '@/utils/storage'

export const getEnWordStore = () => {
    let list: ENWord[] = getLocal(EN_WORD_STORE)

    if (!list) {
        list = []
        setLocal(EN_WORD_STORE, list)
    }

    return list
}

export const updateEnWordStore = (list: ENWord[]) => {
    setLocal(EN_WORD_STORE, list)
}
export const addEnWordStore = (value: ENWord) => {
    const list = getEnWordStore()
    list.push(value)
    updateEnWordStore(list)
    return list
}

export const removeEnWordStore = (word: string) => {
    const list = getEnWordStore()
    const wordIndex = list.findIndex((v) => v.word === word)

    if (wordIndex > -1) {
        list.splice(wordIndex, 1)
        updateEnWordStore(list)
        return list
    }
}
