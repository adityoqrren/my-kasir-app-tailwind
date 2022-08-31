export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const capitalizedFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const showFormattedDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric"
    }

    const dateFormat = new Date(date);
    return dateFormat.toLocaleDateString("id-ID", options) + ` - ${dateFormat.getHours().toString()}:${dateFormat.getMinutes().toString()} WIB`;
}
  