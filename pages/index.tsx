// Next.jsをインポート
import { GetServerSideProps, NextPage } from "next";
// Reactをインポート
import { useEffect, useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props ={
    initialImageUrl:string;
};

const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
    // useStateで状態を定義
    const [imageUrl, setImageUrl] = useState(initialImageUrl); //初期値を渡す
    const [loading, setLoading] = useState(false);

    // ボタンクリックで画像を読み込む
    const handleClick = async ()=>{
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };

    // IndexPageの戻り値？
    return (
    <div className={styles.page}>
        <button onClick={handleClick} className={styles.button}>他の猫も見る</button>
        <div className={styles.frame}>{loading || <img src={imageUrl} className={styles.img}/>}</div>
    </div>);
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async()=>{
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

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

// 猫ジェネレータ完成: https://typescriptbook.jp/tutorials/nextjs
// 次回、続きはここから: https://typescriptbook.jp/tutorials/vercel-deploy