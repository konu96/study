import { useContext } from "@nuxtjs/composition-api";
import { ConfigType } from "dayjs";

export const useDate = () => {
  const { $dayjs } = useContext()

  const isToday = (date: ConfigType): boolean => {
    const convertedToDayjs = $dayjs(date)
    return $dayjs().year() === convertedToDayjs.year() && $dayjs().month() === convertedToDayjs.month() && $dayjs().date() === convertedToDayjs.date()
  }

  return {
    isToday
  }
}
