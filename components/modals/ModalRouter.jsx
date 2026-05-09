"use client";

import GalleryModal from "./GalleryModal";
import LoveNotesModal from "./LoveNotesModal";
import OpenWhenModal from "./OpenWhenModal";
import PlaylistModal from "./PlaylistModal";
import ReasonsModal from "./ReasonsModal";
import DreamsModal from "./DreamsModal";
import TelescopeModal from "./TelescopeModal";
import CakeModal from "./CakeModal";
import LanternModal from "./LanternModal";
import MusicHintModal from "./MusicHintModal";
import EasterEggModal from "./EasterEggModal";

export default function ModalRouter({ activeModal, onClose }) {
  const isLantern = activeModal && activeModal.startsWith("lantern-");
  const lanternIdx = isLantern ? Number(activeModal.split("-")[1]) : 0;

  return (
    <>
      <GalleryModal open={activeModal === "gallery"} onClose={onClose} />
      <LoveNotesModal open={activeModal === "notes"} onClose={onClose} />
      <OpenWhenModal open={activeModal === "openwhen"} onClose={onClose} />
      <PlaylistModal open={activeModal === "playlist"} onClose={onClose} />
      <ReasonsModal open={activeModal === "reasons"} onClose={onClose} />
      <DreamsModal open={activeModal === "dreams"} onClose={onClose} />

      <TelescopeModal open={activeModal === "telescope"} onClose={onClose} />
      <CakeModal open={activeModal === "cake"} onClose={onClose} />
      <MusicHintModal open={activeModal === "music"} onClose={onClose} />
      <EasterEggModal open={activeModal === "easter"} onClose={onClose} />
      <LanternModal open={isLantern} onClose={onClose} index={lanternIdx} />
    </>
  );
}
