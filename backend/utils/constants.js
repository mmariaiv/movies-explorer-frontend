const regexLinkValidation = /https?:\/\/(w+)?.+\.\w+(\/.+)?/;
const regexNameValidation = /^[a-zа-я\s-]+$/i;

module.exports = {
  regexLinkValidation,
  regexNameValidation,
};
