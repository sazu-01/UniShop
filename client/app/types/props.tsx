

export interface DemoTemplateProps {
    demos: { images: string[]; names: string[] };
}

//define images interface

export interface ProductImageGroup {
  color?: string;
  url: string[];
}

export interface ImageProps {
  images: ProductImageGroup[];
  selectedColor: string;
}