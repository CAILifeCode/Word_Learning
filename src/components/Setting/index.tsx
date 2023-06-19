import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { motion } from 'framer-motion'
import { Asterisk, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { setAPIKey, setProxyUrl } from '@/utils/settingStorage'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ModelType } from '@/types'
import { isValidUrl } from '@/utils'
import { useToast } from '@/components/ui/use-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useOnSettingConfig from '@/hooks/useOnSettingConfig'

const Setting = () => {
    const { keyValue, setKeyValue, urlValue, setUrlValue, modelValue, setModelValue } = useOnSettingConfig()
    const [apiKeyValue, setApiKeyValue] = useState(keyValue)
    const [proxyUrlValue, setProxyUrlValue] = useState(urlValue)

    const modelList = [
        {
            id: 1,
            value: 'gpt-3.5-turbo-0613',
        },
        { id: 2, value: 'gpt-3.5-turbo-16k' },
        { id: 3, value: 'gpt-3.5-turbo-0301' },
    ]

    const { toast } = useToast()

    function onSetAPIKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (apiKeyValue === '') {
                toast({
                    description: '请输入 API_KEY',
                    className: 'bg-toast-warning border-0 text-white',
                })
            }
            handleSetAPIKey()
        }
    }

    function onSetProxyUrl(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (proxyUrlValue === '') {
                toast({
                    description: '请输入 PROXY_URL 地址',
                    className: 'bg-toast-warning border-0 text-white',
                })
                return
            }
            if (!isValidUrl(proxyUrlValue)) {
                toast({
                    description: '请输入正确的 PROXY_URL 地址',
                    className: 'bg-toast-error border-0 text-white',
                })
                return
            }
            handleSetProxyUrl()
        }
    }

    function handleSetAPIKey() {
        setAPIKey(apiKeyValue)
        setKeyValue(apiKeyValue)
    }

    function handleSetProxyUrl() {
        setProxyUrl(proxyUrlValue)
        setUrlValue(proxyUrlValue)
    }

    function onOpenChange(open: boolean) {
        if (!open) {
            setApiKeyValue(keyValue)
            setProxyUrlValue(urlValue)
        }
    }

    function handleModelChangeValue(value: ModelType) {
        setModelValue(value)
    }

    return (
        <Popover onOpenChange={onOpenChange}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <motion.div
                                className='fixed right-5 top-5'
                                initial={{ scale: 0.95 }}
                                whileHover={{ scale: 1 }}
                            >
                                <Settings size={24} color='#ffffff' />
                            </motion.div>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>设置</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent className='w-80 z-[100]' align='end' sideOffset={5}>
                <div className='grid gap-4'>
                    <div className='space-y-2'>
                        <h4 className='font-medium leading-none relative'>
                            设置
                            <span className='absolute flex right-0 top-1/2 -translate-y-1/2 text-[12px] text-slate-600'>
                                <Asterisk size={12} color='red' /> 请按回车键确认输入
                            </span>
                        </h4>
                    </div>
                    <div className='grid gap-2'>
                        <div className='grid grid-cols-2 items-center gap-3'>
                            <Label htmlFor='API_KEY' className='flex'>
                                <Asterisk size={12} color='red' />
                                API_KEY
                            </Label>
                            <Input
                                id='API_KEY'
                                value={apiKeyValue}
                                className='col-span-2 h-8'
                                onChange={(e) => setApiKeyValue(e.target.value)}
                                onKeyDown={onSetAPIKey}
                            />
                        </div>
                        <div className='grid grid-cols-2 items-center gap-3'>
                            <Label htmlFor='PROXY_URL' className='flex'>
                                <Asterisk size={12} color='red' />
                                PROXY_URL
                            </Label>
                            <Input
                                id='PROXY_URL'
                                value={proxyUrlValue}
                                className='col-span-2 h-8'
                                onChange={(e) => setProxyUrlValue(e.target.value)}
                                onKeyDown={onSetProxyUrl}
                            />
                        </div>
                        <div className='grid grid-cols-2 items-center gap-3'>
                            <Label className='flex'>
                                <Asterisk size={12} color='red' />
                                GPT_MODEL
                            </Label>

                            <Select onValueChange={handleModelChangeValue} defaultValue={modelValue}>
                                <SelectTrigger className='col-span-2 h-8'>
                                    <SelectValue placeholder='Theme' />
                                </SelectTrigger>
                                <SelectContent className='z-[150]'>
                                    {modelList.map((v) => (
                                        <SelectItem value={v.value} key={v.id}>
                                            {v.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
export default Setting
