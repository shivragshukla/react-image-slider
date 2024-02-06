import ImageSlider from './component/image-slider';
import './App.css';

function App() {
  return (
    <div className="App">
      <ImageSlider
        url={'https://picsum.photos/v2/list'}
        page={2} 
      />
    </div>
  );
}

export default App;
