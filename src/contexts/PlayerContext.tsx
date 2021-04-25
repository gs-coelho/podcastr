import { createContext, useState, ReactNode, useContext } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  loopMode: string;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  playNext: () => void;
  playPrevious: () => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  clearPlayerState: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [regularEpisodeList, setRegularEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loopMode, setLoopMode] = useState("off");
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);

    setRegularEpisodeList(JSON.parse(JSON.stringify(list)));
    setIsShuffling(false);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  const possibleLoopModes = {
    off: () => setLoopMode("all"),
    all: () => setLoopMode("one"),
    one: () => setLoopMode("off"),
  };

  function toggleLoop() {
    const loopModeSetter = possibleLoopModes[loopMode];
    loopModeSetter();
  }

  function toggleShuffle() {
    if (isShuffling) {
      const oldIndex = regularEpisodeList.findIndex(
        (episode) => episode.id === episodeList[currentEpisodeIndex].id
      );

      setEpisodeList(regularEpisodeList);
      setCurrentEpisodeIndex(oldIndex);
    } else {
      const otherEpisodeList = [
        ...episodeList.slice(0, currentEpisodeIndex),
        ...episodeList.slice(currentEpisodeIndex + 1),
      ];

      const shuffledEpisodeList = otherEpisodeList.sort(
        () => Math.random() - 0.5
      );
      shuffledEpisodeList.unshift(episodeList[currentEpisodeIndex]);

      setEpisodeList(shuffledEpisodeList);
      setCurrentEpisodeIndex(0);
    }

    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = loopMode === "all" || currentEpisodeIndex > 0;
  const hasNext =
    loopMode === "all" || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (hasNext) {
      if (
        loopMode === "all" &&
        currentEpisodeIndex + 1 === episodeList.length
      ) {
        setCurrentEpisodeIndex(0);
      } else {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      if (loopMode === "all" && currentEpisodeIndex === 0) {
        setCurrentEpisodeIndex(episodeList.length - 1);
      } else {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }
    }
  }
  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        loopMode,
        isShuffling,
        play,
        playNext,
        playPrevious,
        playList,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        hasNext,
        hasPrevious,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
