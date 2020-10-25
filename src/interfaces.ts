export interface IParsedUrl {
  path?: string;
  params?: { [key: string]: any };
  segments?: string[];
}
