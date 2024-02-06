import { useState, useEffect } from "react"
import { BsChevronLeft, BsChevronRight} from "react-icons/bs";
import './styles.css'

export default function ImageSlider({url, page = 1, limit = 5}) {

	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	const [currentSlider, setCurrentSlider] = useState(0);

	useEffect(()=> {
		fetchImages(url);
	}, [url])

	async function fetchImages(getImageUrl) {
		setLoading(true);
		setErrMsg(null);
		try {
			const response = await fetch(`${getImageUrl}?page=${page}&limit=${limit}`)
			const data = await response.json();

			setImages(data)
			setLoading(false);

		} catch (e) {
			setErrMsg(e.message)
			setLoading(false);
		}
	}

	function handlePreviousSlider() {
		setCurrentSlider(currentSlider === 0 ? images.length - 1 : currentSlider - 1);
	}

	function handleNextSlider() {
		setCurrentSlider(currentSlider === images.length -1 ? 0 : currentSlider + 1);
	}


	if (loading) {
		return <p>Loading...</p>
	}

	if (errMsg) {
		return <p>{errMsg}</p>
	}

	return (
		<div className="container">
			<h1 className="title"> Image Slider</h1>

			<div className="content">
				<BsChevronLeft onClick={() => handlePreviousSlider()} className="arrow arrow-left"/>
				{
					images.map((image, i) =>
						<img 
							key={i}
							src={image.download_url}
							className={currentSlider === i ? 'image' : 'hide'}
						/>
					)
				}
				<BsChevronRight onClick={() => handleNextSlider()} className="arrow arrow-right"/>
				<div className="indicator-group">
				{
					images.map((_,i) => 
						<button onClick={() => setCurrentSlider(i)} className={i === currentSlider ? 'active' : ''}></button>
					)
				}
				</div>
			</div>
		</div>
	);
}
