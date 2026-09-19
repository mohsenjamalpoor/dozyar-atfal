import {
  FaBottleDroplet,
  FaPills,
  FaCapsules,
  FaSyringe,
  FaPrescriptionBottleMedical,
  FaDroplet,
  FaCircleDot,
  FaLungs,
} from "react-icons/fa6";

/** اشکال دارویی: برچسب فارسی + آیکن دکمه (تصویر بزرگ در FormIllustration است) */
export const FORM_TYPES = {
  syrup: { label: "شربت", icon: FaBottleDroplet },
  tablet: { label: "قرص", icon: FaPills },
  capsule: { label: "کپسول", icon: FaCapsules },
  ampoule: { label: "آمپول", icon: FaSyringe },
  vial: { label: "ویال", icon: FaPrescriptionBottleMedical },
  drop: { label: "قطره", icon: FaDroplet },
  suppository: { label: "شیاف", icon: FaCircleDot },
  neb: { label: "نبولایزر", icon: FaLungs },
};
