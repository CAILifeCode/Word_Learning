import { useAtom } from 'jotai/index'
import { api_key, gpt_model, proxy_url } from '@/store'

export default function useOnSettingConfig() {
    const [keyValue, setKeyValue] = useAtom(api_key)
    const [urlValue, setUrlValue] = useAtom(proxy_url)
    const [modelValue, setModelValue] = useAtom(gpt_model)

    return { keyValue, setKeyValue, urlValue, setUrlValue, modelValue, setModelValue }
}
