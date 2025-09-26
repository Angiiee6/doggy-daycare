import React from 'react';
import '/src/css/about.css';




const About = () => {
    return (
        <div className="about-container">
<h1>Hundis - Mer Än Bara ett Hunddagis</h1>
      
      <p className='description'>På Hundis förstår vi att din hund är en äkta familjemedlem. Därför har vi skapat en modern och trygg mötespluts där skratt, viftande svansar och glada skall är vardagsmat. Vår filosofi är enkel: <strong>En trött hund är en lycklig hund</strong>.</p>

      <h3>Vad erbjuder vi på Hundis?</h3>
      
      <div className="features-grid">
        <div className="feature-item">
          <h4>🐾 Social lek i rastgrupper</h4>
          <p>Våra hundar delas in i små, välanpassande grupper för optimal kamratskap.</p>
        </div>
        
        <div className="feature-item">
          <h4>🌲 Utelek på säkra inhägnader</h4>
          <p>Rastgårdar byggda för säkerhet och kul motion utomhus.</p>
        </div>
        
        <div className="feature-item">
          <h4>🧠 Pyssel och mental stimulering</h4>
          <p>Sök- och kluriga lekaktiviteter som utmanar hjärnan.</p>
        </div>
        
        <div className="feature-item">
          <h4>❤️ Massor av kärlek och omtanke</h4>
          <p>Vårt passionerade team ser till att varje hund får lika mycket omtanke och mår bra.</p>
        </div>
      </div>
    </div>
  );
};

export default About;