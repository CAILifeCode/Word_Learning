import { collectWordCardList } from '@/store'
import { useAtomValue, useSetAtom } from 'jotai'

export function useOnCollectList() {
    const collectList = useAtomValue(collectWordCardList)
    const setCollectList = useSetAtom(collectWordCardList)

    return { collectList, setCollectList }
}
