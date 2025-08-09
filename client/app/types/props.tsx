

export interface DemoTemplateProps {
    demos: { images: string[]; names: string[] };
}

//define images interface
export interface ImageProps {
  imgs : string[];
  selectedColorIndex: number;
  colorClickCount: number;

}