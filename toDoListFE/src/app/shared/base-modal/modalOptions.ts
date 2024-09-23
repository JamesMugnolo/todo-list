export interface Options {
  animations?: {
    modal?: {
      enter?: string;
      leave?: string;
    };
    overlay?: {
      enter?: string;
      leave?: string;
    };
  };
  size?: {
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    width?: string;
    height?: string;
  };
}
