import hljs from 'highlight.js/lib/highlight';
import { languages } from './languages';

for (const [name, language] of languages) {
  hljs.registerLanguage(name, language);
}

export { hljs };
