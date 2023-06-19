import { atom } from 'jotai'
import { getEnWordStore } from '@/utils/enWordStorage'
import { getAPIKey, getModel, getProxyUrl, setModel } from '@/utils/settingStorage'
import { ModelType } from '@/types'

export const collectWordCardList = atom(getEnWordStore())

export const api_key = atom(getAPIKey())

export const proxy_url = atom(getProxyUrl())

export const gpt_model = atom(
    () => {
        let model = getModel()
        if (model === '') {
            setModel('gpt-3.5-turbo-0613')
            model = getModel()
        }
        return model
    },
    (get, set, model: ModelType) => {
        setModel(model)
    }
)
