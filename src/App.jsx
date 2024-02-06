import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLanguages,
  translateText,
} from './redux/actions/translateActions';
import Select from 'react-select';
import { setAnswer } from './redux/slices/translateSlice';

const App = () => {
  const dispatch = useDispatch();
  const languageSlice = useSelector((store) => store.languageSlice);
  const translateSlice = useSelector((store) => store.translateSlice);

  const [text, setText] = useState('');

  const [sourceLang, setSourceLang] = useState({
    value: 'tr',
    label: 'Turkish',
  });
  const [targetLang, setTargetLang] = useState({
    value: 'en',
    label: 'English',
  });

  // api'dan dil verileri al ve store'a aktar
  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  // diziyi bizden istenen formata çevirdik:
  // objelerin {code,name} keylerini {value,label}'â çevirdik
  // Burdaki map top-level kod olduğu için bielşen her render
  // olduğunda hesaplama tekrardan yapılıyordu. Gerkesiz hesaplamalar
  // projenni hıznı yavaşlatabileceğinden useMemo kullanıp bu sorunun
  // önüne geçtik
  const data = useMemo(
    () =>
      languageSlice.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [languageSlice.languages]
  );

  // değişme
  const handleSwap = () => {
    // select'leri değiştir
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // cevap textarea'sında veriyi diğer textarea'ya aktar
    setText(translateSlice.answer);

    // soru textarea'sında veriyi cevap textarea'ya aktar
    dispatch(setAnswer(text));
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Çeviri+</h1>
        {/* üst kısım */}
        <div className="upper">
          <Select
            value={sourceLang}
            onChange={setSourceLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />

          <button onClick={handleSwap}>Değiştir</button>

          <Select
            value={targetLang}
            onChange={setTargetLang}
            className="select"
            options={data}
            isLoading={languageSlice.isLoading}
            isDisabled={languageSlice.isLoading}
          />
        </div>

        {/* orta kısım */}
        <div className="middle">
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <textarea disabled value={translateSlice.answer} />
            {translateSlice.isLoading && (
              <svg xmlns="http://www.w3.org/2000/svg" height="200px" width="200px" viewBox="0 0 200 200" className="pencil">
              <defs>
                <clipPath id="pencil-eraser">
                  <rect height="30" width="30" ry="5" rx="5"></rect>
                </clipPath>
              </defs>
              <circle transform="rotate(-113,100,100)" stroke-linecap="round" stroke-dashoffset="439.82" stroke-dasharray="439.82 439.82" stroke-width="2" stroke="currentColor" fill="none" r="70" className="pencil__stroke"></circle>
              <g transform="translate(100,100)" className="pencil__rotate">
                <g fill="none">
                  <circle transform="rotate(-90)" stroke-dashoffset="402" stroke-dasharray="402.12 402.12" stroke-width="30" stroke="hsl(223,90%,50%)" r="64" className="pencil__body1"></circle>
                  <circle transform="rotate(-90)" stroke-dashoffset="465" stroke-dasharray="464.96 464.96" stroke-width="10" stroke="hsl(223,90%,60%)" r="74" className="pencil__body2"></circle>
                  <circle transform="rotate(-90)" stroke-dashoffset="339" stroke-dasharray="339.29 339.29" stroke-width="10" stroke="hsl(223,90%,40%)" r="54" className="pencil__body3"></circle>
                </g>
                <g transform="rotate(-90) translate(49,0)" className="pencil__eraser">
                  <g className="pencil__eraser-skew">
                    <rect height="30" width="30" ry="5" rx="5" fill="hsl(223,90%,70%)"></rect>
                    <rect clip-path="url(#pencil-eraser)" height="30" width="5" fill="hsl(223,90%,60%)"></rect>
                    <rect height="20" width="30" fill="hsl(223,10%,90%)"></rect>
                    <rect height="20" width="15" fill="hsl(223,10%,70%)"></rect>
                    <rect height="20" width="5" fill="hsl(223,10%,80%)"></rect>
                    <rect height="2" width="30" y="6" fill="hsla(223,10%,10%,0.2)"></rect>
                    <rect height="2" width="30" y="13" fill="hsla(223,10%,10%,0.2)"></rect>
                  </g>
                </g>
                <g transform="rotate(-90) translate(49,-30)" className="pencil__point">
                  <polygon points="15 0,30 30,0 30" fill="hsl(33,90%,70%)"></polygon>
                  <polygon points="15 0,6 30,0 30" fill="hsl(33,90%,50%)"></polygon>
                  <polygon points="15 0,20 10,10 10" fill="hsl(223,10%,10%)"></polygon>
                </g>
              </g>
            </svg>
            )}
          </div>
        </div>

        {/* altk kısım */}
        <button
          onClick={() =>
            dispatch(translateText({ text, sourceLang, targetLang }))
          }
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;