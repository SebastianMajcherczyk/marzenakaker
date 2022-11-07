import React from 'react';
import Portrait from './54622531-0-10.png';
import './about.css';

export const About = ({ language }) => {
	return (
		<section className='container' id='about-me'>
			<img src={Portrait} alt='Portrait' className='img' />
			{language === 'pl' && (
				<div className='about-right'>
					<h3 className='h3'>O mnie</h3>
					<p className='about-me'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
						delectus doloremque inventore numquam quia, minima autem culpa rerum
						earum et, odit tenetur cum perferendis quisquam iste pariatur
						repellendus voluptatibus eaque rem beatae maxime modi. Accusamus,
						rem commodi laborum tenetur eligendi cumque libero non. Nisi,
						expedita debitis. Ipsum praesentium quibusdam dolorum repellendus
						ullam vero recusandae? Minus deserunt nisi inventore, hic iusto
						sequi! Aut harum tenetur fuga quod excepturi. Tempore architecto
						magni earum ratione nesciunt ex sunt repellendus optio deleniti
						aliquid, qui, rem sit neque illum reiciendis. Similique ad facilis
						incidunt molestias beatae, perferendis fugit deserunt voluptatibus
						expedita, quos quo veritatis sint at sapiente nobis? Ipsum
						repudiandae libero omnis recusandae nostrum et consequuntur, natus
						dolor, ut sequi provident quod amet eligendi. Provident similique
						esse vel cumque voluptatibus aut possimus, eveniet necessitatibus
						maiores non fugit a enim consectetur incidunt at vitae assumenda,
						omnis quidem totam.
					</p>
				</div>
			)}
			{language === 'en' && (
				<div className='about-right'>
					<h3 className='h3'>About me</h3>
					<p className='about-me'>
						But I must explain to you how all this mistaken idea of denouncing
						of a pleasure and praising pain was born and I will give you a
						complete account of the system, and expound the actual teachings of
						the great explorer of the truth, the master-builder of human
						happiness. No one rejects, dislikes, or avoids pleasure itself,
						because it is pleasure, but because those who do not know how to
						pursue pleasure rationally encounter consequences that are extremely
						painful. Nor again is there anyone who loves or pursues or desires
						to obtain pain of itself, because it is pain, but occasionally
						circumstances occur in which toil and pain can procure him some
						great pleasure. To take a trivial example, which of us ever
						undertakes laborious physical exercise, except to obtain some
						advantage from it? But who has any right to find fault with a man
						who chooses to enjoy a pleasure that has no annoying consequences,
						or one who avoids a pain that produces no resultant pleasure? On the
						other hand, we denounce with righteous indignation and dislike men
						who are so beguiled and demoralized by the charms of pleasure of the
						
					</p>
				</div>
			)}
		</section>
	);
};
