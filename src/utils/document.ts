class Document {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static removeMask(value: string) {
    return value.replace(/\D/g, '');
  }
}

export { Document };
