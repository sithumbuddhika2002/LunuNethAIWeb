"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgriBotDemo;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const DemoAppImage_1 = require("./DemoAppImage");
const copy = {
    en: {
        greeting: 'Hello! Let’s take a closer look at your onion crop. Choose a concern to try a guided conversation.',
        concerns: ['My onion leaves are yellow', 'I can see small insects', 'There are purple leaf spots'],
        question: 'Can you see insects on the plant? Check between the leaves, then choose the closest answer.',
        answers: ['Small yellow or brown insects', 'Caterpillars or worms', 'No insects visible', 'I’m not sure'],
        next: 'Where do you notice the change most?',
        locations: ['Leaf tips', 'Older leaves', 'Across the plant'],
        finish: 'Thanks. This is how the app gathers clues before offering guidance. For this example, the next step is a clear close-up photo of the affected leaf. Try the disease and pest samples to explore the results.',
        unknown: 'This preview has scripted answers. Choose one of the options below to continue the example.',
        placeholder: 'Describe your crop concern...',
        restart: 'Start again',
        title: 'LunuNeth Chatbot',
        language: 'Language',
        followup: 'Follow-up question',
        prompt: 'Choose an answer or type its number.',
        sample: 'Guided example · Scripted replies',
    },
    si: {
        greeting: 'ආයුබෝවන්! ඔබේ ලූනු වගාවේ ගැටලුවක් තෝරන්න.',
        concerns: ['ලූනු කොළ කහ වෙලා', 'කුඩා කෘමීන් පෙනෙනවා', 'කොළවල දම් පැහැ ලප තිබෙනවා'],
        question: 'පැළවල කෘමීන් පෙනෙනවාද? කොළ අතර පරීක්ෂා කර පිළිතුරක් තෝරන්න.',
        answers: ['කුඩා කහ හෝ දුඹුරු කෘමීන්', 'දළඹුවන් හෝ පණුවන්', 'කෘමීන් පෙනෙන්නේ නැහැ', 'විශ්වාස නැහැ'],
        next: 'වෙනස වැඩිපුර පෙනෙන්නේ කොතැනද?',
        locations: ['කොළ අග', 'පරණ කොළ', 'මුළු පැළය පුරා'],
        finish: 'ස්තූතියි. මෙලෙස යෙදුම ඔබේ වගාව පිළිබඳ තොරතුරු රැස් කරයි. ඊළඟට බලපෑමට ලක්වූ කොළයක පැහැදිලි ඡායාරූපයක් ගන්න. ඉහත රෝග සහ කෘමි උදාහරණ බලන්න.',
        unknown: 'මෙය සූදානම් කළ පිළිතුරු සහිත උදාහරණයකි. ඉදිරියට යාමට පහත පිළිතුරක් තෝරන්න.',
        placeholder: 'වගාවේ ගැටලුව ලියන්න...',
        restart: 'නැවත අරඹන්න',
        title: 'LunuNeth Chatbot',
        language: 'භාෂාව',
        followup: 'පසු විමසුම් ප්‍රශ්නය',
        prompt: 'පිළිතුරක් තෝරන්න හෝ එහි අංකය ලියන්න.',
        sample: 'උදාහරණයක් · සූදානම් කළ පිළිතුරු',
    },
    singlish: {
        greeting: 'Ayubowan! Oyage lunu wagaawe gataluwak thoranna.',
        concerns: ['Lunu kola kaha wela', 'Kuda krumin penenawa', 'Kola wala dam paata lapa thiyenawa'],
        question: 'Pala wala krumin penenawada? Kola athara balala pilithurak thoranna.',
        answers: ['Kuda kaha ho dumburu krumin', 'Dalambuwan ho panuwan', 'Krumin penenne naha', 'Vishwasa naha'],
        next: 'Wenasa wedipura penenne koheda?',
        locations: ['Kola aga', 'Parana kola', 'Mulu palaya pura'],
        finish: 'Sthuthiyi. App eka me widihata wagaawe thorathuru ekathu karanawa. Ilangata balapam athi kolayaka pehedili photo ekak ganna. Ihatha disease saha pest samples balanna.',
        unknown: 'Meka kalin sakas kala pilithuru sahitha demo ekak. Pahatha pilithurak thorala idiriyata yanna.',
        placeholder: 'Wagaawe gataluwa liyanna...',
        restart: 'Newatha arambanna',
        title: 'LunuNeth Chatbot',
        language: 'Bhashawa',
        followup: 'Thawath prashnayak',
        prompt: 'Pilithurak thoranna, nathnam eke ankaya liyanna.',
        sample: 'Demo ekak · Sakas kala pilithuru',
    },
};
function AgriBotDemo() {
    const [language, setLanguage] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AgriBotDemo'] || {}, 'language') ? globalThis.__states['AgriBotDemo']['language'] : ('en'));
    const [messages, setMessages] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AgriBotDemo'] || {}, 'messages') ? globalThis.__states['AgriBotDemo']['messages'] : ([{ sender: 'bot', text: copy.en.greeting }]));
    const [stage, setStage] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AgriBotDemo'] || {}, 'stage') ? globalThis.__states['AgriBotDemo']['stage'] : (0));
    const [input, setInput] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AgriBotDemo'] || {}, 'input') ? globalThis.__states['AgriBotDemo']['input'] : (''));
    const [typing, setTyping] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AgriBotDemo'] || {}, 'typing') ? globalThis.__states['AgriBotDemo']['typing'] : (false));
    const bodyRef = (0, react_1.useRef)(null);
    const timer = (0, react_1.useRef)(null);
    const text = copy[language];
    const options = stage === 0 ? text.concerns : stage === 1 ? text.answers : stage === 2 ? text.locations : [];
    (0, react_1.useEffect)(() => () => {
        if (timer.current)
            clearTimeout(timer.current);
    }, []);
    (0, react_1.useEffect)(() => {
        const body = bodyRef.current;
        body?.scrollTo({ top: body.scrollHeight, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }, [messages, typing]);
    const reset = (nextLanguage = language) => {
        if (timer.current)
            clearTimeout(timer.current);
        timer.current = null;
        setTyping(false);
        setLanguage(nextLanguage);
        setStage(0);
        setInput('');
        setMessages([{ sender: 'bot', text: copy[nextLanguage].greeting }]);
    };
    const send = (value) => {
        if (!value.trim() || timer.current)
            return;
        const valueLower = value.trim().toLowerCase();
        const numeric = /^[1-4]$/.test(valueLower) ? Number(valueLower) - 1 : -1;
        const recognized = options.some(option => option.toLowerCase() === valueLower) ||
            (numeric >= 0 && numeric < options.length) ||
            (stage === 0 && /leaf|leaves|yellow|insect|pest|purple|kola|krumi|lunu|කොළ|කහ|කෘමි|ලූනු/.test(valueLower));
        const nextStage = recognized ? Math.min(stage + 1, 3) : stage;
        setMessages(previous => [...previous, { sender: 'user', text: value.trim() }]);
        setInput('');
        setTyping(true);
        timer.current = setTimeout(() => {
            timer.current = null;
            setTyping(false);
            setStage(nextStage);
            setMessages(previous => [...previous, {
                    sender: 'bot',
                    text: !recognized ? text.unknown : nextStage === 1 ? text.question : nextStage === 2 ? text.next : text.finish,
                    question: recognized && nextStage < 3,
                }]);
        }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "ld-app-demo", children: [(0, jsx_runtime_1.jsxs)("div", { className: "ld-app-panel ld-guided-chat", lang: language === 'si' ? 'si' : 'en', children: [(0, jsx_runtime_1.jsxs)("header", { className: "ld-panel-header", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { size: 21 }), " ", text.title] }), (0, jsx_runtime_1.jsx)("button", { className: "ld-icon-button", "data-action": "() => reset()", "aria-label": text.restart, children: (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcw, { size: 17 }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-chat-tools", children: [(0, jsx_runtime_1.jsx)("span", { children: text.language }), (0, jsx_runtime_1.jsx)("div", { role: "group", "aria-label": "Conversation language", children: ['en', 'si', 'singlish'].map(lang => (0, jsx_runtime_1.jsx)("button", { "aria-pressed": language === lang, "data-action": "() => reset(lang)", children: lang === 'en' ? 'EN' : lang === 'si' ? 'සිංහල' : 'Singlish' }, lang)) })] }), (0, jsx_runtime_1.jsx)("p", { className: "ld-chat-disclosure", children: text.sample }), (0, jsx_runtime_1.jsxs)("div", { className: "chat-body", ref: bodyRef, role: "log", "aria-label": "Guided crop conversation", "aria-live": "polite", children: [messages.map((message, index) => (0, jsx_runtime_1.jsxs)("div", { className: `chat-message ${message.sender}`, children: [message.question && (0, jsx_runtime_1.jsx)("strong", { className: "ld-question-label", children: text.followup }), message.text] }, index)), !typing && options.length > 0 && (0, jsx_runtime_1.jsxs)("div", { className: "ld-chat-answers", children: [(0, jsx_runtime_1.jsx)("p", { children: text.prompt }), options.map((option, index) => (0, jsx_runtime_1.jsxs)("button", { className: "chat-option-btn", "data-action": "() => send(option)", children: [(0, jsx_runtime_1.jsx)("span", { children: index + 1 }), option] }, option))] }), !typing && stage === 3 && (0, jsx_runtime_1.jsxs)("button", { className: "ld-text-button", "data-action": "() => reset()", children: [text.restart, " ", (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcw, { size: 16 })] }), typing && (0, jsx_runtime_1.jsxs)("div", { className: "chat-typing", role: "status", "aria-label": "Preparing sample reply", children: [(0, jsx_runtime_1.jsx)("span", {}), (0, jsx_runtime_1.jsx)("span", {}), (0, jsx_runtime_1.jsx)("span", {})] })] }), (0, jsx_runtime_1.jsxs)("form", { className: "chat-footer", onSubmit: event => { event.preventDefault(); send(input); }, children: [(0, jsx_runtime_1.jsx)("input", { className: "chat-input", "aria-label": text.placeholder, placeholder: text.placeholder, value: input, onChange: event => setInput(event.target.value), disabled: typing || stage === 3, maxLength: 500 }), (0, jsx_runtime_1.jsx)("button", { className: "chat-send-btn flex-center", type: "submit", "aria-label": "Send message", disabled: typing || stage === 3 || !input.trim(), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { size: 18 }) })] })] }), (0, jsx_runtime_1.jsx)(DemoAppImage_1.DemoScreenReference, { screen: "chat" })] }));
}
