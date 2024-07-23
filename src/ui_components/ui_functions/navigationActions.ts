import { useAtom } from "jotai";
import { historyAtom } from "../../state/atoms";
import { Screens } from "../../state/navigationTypes";

export const useNavigation = () => {
  const [history, setHistory] = useAtom(historyAtom);

  const navigate = (screen: Screens) => {
    setHistory((prevHistory) => [...prevHistory, screen]);
  };

  const goBack = () => {
    setHistory((prevHistory) => prevHistory.slice(0, -1));
  };

  return {
    currentScreen: history[history.length - 1],
    history,
    navigate,
    goBack,
  };
};
