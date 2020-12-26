import URL from  'url';
import slug from 'slug';
import path from 'path';
import cheerio from 'cheerio';

export const urlToFilename = url => {
    const parsedUrl = URL.parse(url);
    const urlPath = parsedUrl.path.split('/')
        .filter(component => {
            return component !== '';
        })
        .map(component => {
            return slug(component, { remove: null });
        })
        .join('/');
    const fileName = path.join(parsedUrl.hostname, urlPath);
    if(!path.extname(fileName).match(/htm/)) {
        return `${fileName}.html`;
    }
    return fileName;
};

const getLinkUrl = (currentUrl, element) => {
    const link = URL.resolve(currentUrl, element.attribs.href || '');
    const parsedLink = URL.parse(link);
    const currentParsedUrl = URL.parse(currentUrl);
    if(parsedLink.hostname !== currentParsedUrl.hostname
        || !parsedLink.pathname) {
        return '';
    }
    return link;
};

export const getPageLinks = (currentUrl, body) => {
    return [].slice.call(cheerio.load(body)('a'))
        .map(element => {
            return getLinkUrl(currentUrl, element);
        })
        .filter(element => {
            return !!element;
        });
};
