import React, { useState, useEffect, useContext } from 'react';
import { FaChevronCircleUp } from 'react-icons/fa';
import './productFilter.css';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../ContextProvider';
import { productsService } from '../../services/products.service';
import ReactSlider from 'react-slider';
import { getDefaultFilterCriteria } from '../../App';

export const ProductFilter = ({
	handleChange,
	filterCriteria,
	setFilterCriteria,
	ingredientsFilterMethod,
	setIngredientsFilterMethod,
	
}) => {
	const { ingredients, sortingCriteria, setSortingCriteria } = useContext(AppContext);
	const { t, i18n } = useTranslation();
	const [filterHidden, setfilterHidden] = useState(null);
	const showHideFilter = e => {
		e.preventDefault();
		setfilterHidden(filterHidden ? null : 'hidden');
	};
	const resetFilter = e => {
		e.preventDefault();
		setFilterCriteria(getDefaultFilterCriteria());
		setSortingCriteria({
			sortingValue: 'createdAt',
			method: 'asc'
		})
	};

	const getTranslatedLabel = (key, defaultValue) =>
		i18n.exists(key) ? t(key) : defaultValue;

	return (
		<div className='filter-container'>
			<button onClick={showHideFilter} className='btn-hide'>
				{' '}
				<FaChevronCircleUp className={`leftUp ${filterHidden}`} />
				{filterHidden ? t('SHOW_FILTER') : t('HIDE')}
				<FaChevronCircleUp className={`rightUp ${filterHidden}`} />{' '}
			</button>
			<form className={`filter ${filterHidden}`}>
				<div className='slider-container'>
					<section>
						<p>{t('CHOOSE_WEIGHT')} (kg)</p>
						<ReactSlider
							className='horizontal-slider'
							thumbClassName='thumb'
							trackClassName='track'
							min={0.5}
							max={100}
							value={[
								+filterCriteria?.weight?.value || 0.5,
								+filterCriteria?.weight_max.value || 100,
							]}
							ariaLabel={['Lower thumb', 'Upper thumb']}
							ariaValuetext={state => `Thumb value ${state.valueNow}`}
							renderThumb={(props, state) => (
								<div {...props}>{state.valueNow}</div>
							)}
							step={0.5}
							pearling
							minDistance={0}
							onChange={([min, max]) => {
								const eventMin = {
									target: {
										name: 'weight',
										value: min,
									},
								};
								const filterCriteriaChanged = handleChange(eventMin);

								const eventMax = {
									target: {
										name: 'weight_max',
										value: max,
									},
								};

								handleChange(eventMax, filterCriteriaChanged);
							}}
							withTracks={true}
						/>
					</section>
					<section>
						<p>{t('NUMBER_OF_PERSONS')}</p>
						<ReactSlider
							className='horizontal-slider'
							thumbClassName='thumb'
							trackClassName='track'
							min={1}
							max={100}
							value={[
								+filterCriteria?.persons?.value || 1,
								+filterCriteria?.persons_max?.value || 100,
							]}
							ariaLabel={['Lower thumb', 'Upper thumb']}
							ariaValuetext={state => `Thumb value ${state.valueNow}`}
							renderThumb={(props, state) => (
								<div {...props}>{state.valueNow}</div>
							)}
							step={1}
							pearling
							minDistance={0}
							onChange={([min, max]) => {
								const eventMin = {
									target: {
										name: 'persons',
										value: min,
									},
								};
								const filterCriteriaChanged = handleChange(eventMin);

								const eventMax = {
									target: {
										name: 'persons_max',
										value: max,
									},
								};
								handleChange(eventMax, filterCriteriaChanged);
							}}
							withTracks={true}
						/>
					</section>
				</div>
				<fieldset className='category'>
					<legend> {t('CHOOSE_CATEGORY')}</legend>
					<div>
						<label htmlFor='birthday'>{t('BIRTHDAY')}</label>
						<input
							type='checkbox'
							id='birthday'
							name='category-birthday'
							value='birthday'
							onChange={handleChange}
							checked={filterCriteria?.category?.value?.includes('birthday')}
						/>
					</div>
					<div>
						<label htmlFor='wedding'>{t('WEDDING')}</label>
						<input
							type='checkbox'
							id='wedding'
							name='category-wedding'
							value='wedding'
							onChange={handleChange}
							checked={filterCriteria.category.value.includes('wedding')}
						/>
					</div>
					<div>
						<label htmlFor='other'>{t('OTHER')}</label>
						<input
							type='checkbox'
							id='other'
							name='category-other'
							value='other'
							onChange={handleChange}
							checked={filterCriteria.category.value.includes('other')}
						/>
					</div>
				</fieldset>

				{/* <fieldset className='subcategory'>
					<legend> {t('CHOOSE_SUBCATEGORY')}</legend>
					<div>
						<input
							type='checkbox'
							id='small'
							name='subcategory-small'
							value='small'
							onChange={handleChange}
							checked={filterCriteria.subcategory.value.includes('small')}
						/>
						<label htmlFor='small'>Small</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='medium'
							name='subcategory-medium'
							value='medium'
							onChange={handleChange}
							checked={filterCriteria.subcategory.value.includes('medium')}
						/>
						<label htmlFor='medium'>Medium</label>
					</div>
					<div>
						<input
							type='checkbox'
							id='large'
							name='subcategory-large'
							value='large'
							onChange={handleChange}
							checked={filterCriteria.subcategory.value.includes('large')}
						/>
						<label htmlFor='large'>Large</label>
					</div>
				</fieldset> */}
				<fieldset className='ingredients'>
					<legend>{t('CHOOSE INGREDIENTS')}</legend>
					<section className='section'>
						<div className='list'>
							{ingredients.map(item => (
								<div key={item.id} className='ingredients-checkbox'>
									<label htmlFor={item.value}>
										{getTranslatedLabel(item.translationKey, item.label)}
									</label>
									<input
										type='checkbox'
										id={item.value}
										checked={filterCriteria?.ingredients.value.includes(
											item.value
										)}
										name={'ingredients-' + item.value}
										onChange={handleChange}
									/>
								</div>
							))}
						</div>
						<fieldset className='filter-method'>
							<legend>{t('CHOOSE_FILTER_METHOD')}</legend>
							<div className='method-checkbox'>
								<label htmlFor='OR'>{t('OR')}</label>
								<input
									type='radio'
									id='OR'
									value='OR'
									name='filter_ingredients'
									checked={ingredientsFilterMethod === 'OR'}
									onChange={() => setIngredientsFilterMethod('OR')}
								/>
							</div>
							<div className='method-checkbox'>
								<label htmlFor='AND'>{t('AND')}</label>
								<input
									type='radio'
									id='AND'
									value='AND'
									name='filter_ingredients'
									checked={ingredientsFilterMethod === 'AND'}
									onChange={() => setIngredientsFilterMethod('AND')}
								/>
							</div>
						</fieldset>
						<fieldset>
							<legend>Sortuj wg.:</legend>
							<div className='list'>
								<div>
									<label htmlFor='createdAt'>{t('CREATED_AT')}</label>
									<input
										type='radio'
										id='createdAt'
										value='creatredAt'
										name='sorting'
										checked={sortingCriteria.sortingValue === 'createdAt'}
										onChange={() =>
											setSortingCriteria({
												...sortingCriteria,
												sortingValue: 'createdAt',
											})
										}
									/>
								</div>
								<div>
									<label htmlFor='weight'>{t('WEIGHT')}</label>
									<input
										type='radio'
										id='weight'
										value='weight'
										name='sorting'
										checked={sortingCriteria.sortingValue === 'weight'}
										onChange={() =>
											setSortingCriteria({
												...sortingCriteria,
												sortingValue: 'weight',
											})
										}
									/>
								</div>
								<div>
									<label htmlFor='persons'>{t('NUMBER_OF_PERSONS')}</label>
									<input
										type='radio'
										id='persons'
										value='persons'
										name='sorting'
										checked={sortingCriteria.sortingValue === 'persons'}
										onChange={() =>
											setSortingCriteria({
												...sortingCriteria,
												sortingValue: 'persons',
											})
										}
									/>
								</div>
							</div>
							<fieldset className='filter-method'>
								<legend>Sortuj:</legend>
								<div className='method-checkbox'>
									<label htmlFor='createdAt'>{t('ASC')}</label>
									<input
										type='radio'
										id='asc'
										value='asc'
										name='method'
										checked={sortingCriteria.method === 'asc'}
										onChange={() =>
											setSortingCriteria({
												...sortingCriteria,
												method: 'asc',
											})
										}
									/>
								</div>
								<div className='method-checkbox'>
									<label htmlFor='desc'>{t('DESC')}</label>
									<input
										type='radio'
										id='desc'
										value='desc'
										name='method'
										checked={sortingCriteria.method === 'desc'}
										onChange={() =>
											setSortingCriteria({
												...sortingCriteria,
												method: 'desc',
											})
										}
									/>
								</div>
							</fieldset>
						</fieldset>
					</section>
				</fieldset>
				<button className='btn-reset' onClick={resetFilter}>
					{t('RESET')}
				</button>
			</form>
		</div>
	);
};
