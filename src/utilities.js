import { Link } from 'react-router-dom';

export const normalizeName = (name) => {
    if (name.first || name.lastName) {
        return {
            first: name.first.trim(),
            last: name.lastName.trim(),
        }
    }
    if (name.name) {
        if (name.name.indexOf(',') !== -1) {
            const nameParts = name.name.split(',');
            return { 
                first: nameParts[1].trim(),
                last: nameParts[0].trim(),
            }
        }

        const lastIndex = name.name.lastIndexOf(' ');

        return {
            first: name.name.slice(0, lastIndex).trim(),
            last: name.name.slice(lastIndex).trim(),
        }
    }
}

export const normalizeTime = (time) => time !== undefined ? ((typeof time) !== 'number') ? Date.parse(time) : time : undefined;

export const findLatestTime = (times) => Math.max(...times.filter(time => time !== undefined));

const linkify = (part) => {
    const elements =  /\[(.*)\]\((.*)\)/.exec(part);

    return (
        <Link to={elements[2]}>
            {elements[1]}
        </Link>
    )
}

export const fixLinks = (content) => content
    .map((paragraph) => paragraph.replace('[', '//['))
    .map((paragraph) => paragraph.replace(')', ')//'))
    .map((paragraph) => paragraph.split('//'))
    .map((paragraph) => paragraph.map((part) => !part.startsWith('[') ? part : linkify(part)))
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);