'use client'

class VoiceService {
    private static instance: SpeechSynthesisUtterance | null

    public static getInstance(): SpeechSynthesisUtterance | null {
        if (typeof window === 'undefined') return null
        if (!VoiceService.instance) {
            VoiceService.instance = new window.SpeechSynthesisUtterance()
        }

        VoiceService.instance.rate = 0.8
        VoiceService.instance.pitch = 1.2

        return VoiceService.instance
    }
}

const voiceService = VoiceService.getInstance()
export default voiceService
