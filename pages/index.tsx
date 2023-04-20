// Next.jsをインポート
import { NextPage } from "next";
// Reactをインポート
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
    // useStateで状態を定義
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    // マウント時に画像を読み込む宣言
    useEffect(() => {
        fetchImage().then((newImage) => {
            // 画像URLの状態を更新する
            setImageUrl(newImage.url);
            // ローディング状態を更新する
            setLoading(false);
        });
    }, []);
    return <div>{loading || <img src={imageUrl} />}</div>
};
export default IndexPage;

// imageに型をつける
type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};

// 次回、続きはここから: https://typescriptbook.jp/tutorials/nextjs#%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%81%97%E3%81%9F%E3%81%A8%E3%81%8D%E3%81%AB%E7%94%BB%E5%83%8F%E3%81%8C%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B