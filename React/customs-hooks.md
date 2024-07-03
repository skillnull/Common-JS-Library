###### 获取useState最新值
```ts
// util.ts
export const useRefState = (init: any = null) => {
  const [state, setState] = useState(init);
  const stateRef = useRef(init);
  const setProxy = (newVal: any) => {
    stateRef.current = newVal;
    setState(newVal);
  };
  const getState = () => stateRef.current;
  return [state, setProxy, getState];
};

// 使用
import { useRefState } from "util"

const [state, setState, getState] = useRefState(0);

state // state 值，变动后更新DOM
setState // setState，变动 state
getState() // 获取最新值
```
