declare module '*.scss' {
    const content: Record<string, string>
    export default content
}
declare module '*.css' {
    const content: { [className: string]: string }
    export default content
}

declare module 'react-color-extractor'

declare module 'use-sound' {
    import { Howl, Howler } from 'howler';
  
    interface HookOptions {
      volume?: number;
      playbackRate?: number;
      interrupt?: boolean;
      soundEnabled?: boolean;
      sprite?: { [key: string]: [number, number] };
    }
  
    interface ExposedData {
      volume: number;
      playbackRate: number;
      interrupt: boolean;
      soundEnabled: boolean;
      sprite: { [key: string]: [number, number] };
    }
  
    type PlayFunction = (options?: PlayOptions) => void;
  
    interface PlayOptions {
      id?: string;
      forceSoundEnabled?: boolean;
      playbackRate?: number;
    }
  
    interface PlayExposedData extends ExposedData {
      stop: (id?: string) => void;
      pause: (id?: string) => void;
      duration: number;
      sound: Howl | null;
    }
  
    type UseSoundTuple = [PlayFunction, PlayExposedData];
  
    const useSound: (src: string, options?: HookOptions) => UseSoundTuple;
  
    export default useSound;
  }