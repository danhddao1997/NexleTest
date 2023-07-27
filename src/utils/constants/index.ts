export const PRIMARY_COLOR = '#647FFF';

export const PASSWORD_STRENGTH_CONDITIONS = [
  /^(?=.*[a-z])(?=.*[A-Z]).+$/g,
  /\d/g,
  /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/,
];

export const PASSWORD_STRENGTH_MAPPING: Record<
  number,
  {text: string; color: string}
> = {
  0: {
    text: 'Weak',
    color: '#E05151',
  },
  1: {
    text: 'Fair',
    color: '#E3A063',
  },
  2: {
    text: 'Good',
    color: PRIMARY_COLOR,
  },
  3: {
    text: 'Strong',
    color: '#91E2B7',
  },
};
