import "./CoursesTable.css";
import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";

const CoursesTable = ({ data }) => {
	const {
		state: { coursesData, selectedCourses },
		actions: { setCoursesData, setSelectedCourses },
	} = useContext(UserDataContext);
	const [checkedArray, setCheckedArray] = useState([]);
	let collectionIndex = 1;

	const selectCourses = (course, key) => {
		if (!course.obligatory) {
			selectChecked(course, key);
		}
	};

	const selectChecked = (course, key) => {
		let copyChecked = [...checkedArray];
		copyChecked[key] = !checkedArray[key];
		let ind = selectedCourses.indexOf(course.id);
		if (ind < 0) {
			if (coursesData.total - course.credits >= 0) {
				setCoursesData((prev) => ({
					...prev,
					total: coursesData.total - course.credits,
				}));
				setCheckedArray(copyChecked);
				setSelectedCourses((prev) => [...prev, course.id]);
			}
		} else {
			setCoursesData((prev) => ({
				...prev,
				total: coursesData.total + course.credits,
			}));
			setCheckedArray(copyChecked);
			setSelectedCourses((prev) => {
				return prev.filter((c) => c != course.id);
			});
		}
	};

	useEffect(() => {
		if (data.courses.length) {
			setCheckedArray((prev) => {
				let arr = [];
				data.courses.map((course, key) => {
					if (course.selected) {
						arr.push(true);
					} else {
						arr.push(false);
					}
				});
				return [...arr];
			});
			let selectedObligatory = data.courses
				.filter((course) => course.obligatory || course.selected)
				.map((course) => course.id);
			if (selectedObligatory.length) {
				setSelectedCourses((prev) => [...prev, ...selectedObligatory]);
			}
		}
	}, [data.courses]);

	return (
		<div className="courses-table-wrapper">
			<h3 className="courses-table-title">Year {data.year}</h3>
			<table className="courses-table">
				<thead>
					<tr className="courses-table-header-row">
						<th className="courses-table-header">Code</th>
						<th className="courses-table-header">Name</th>
						<th className="courses-table-header">Credits</th>
						<th className="courses-table-header">Passed</th>
						<th className="courses-table-header"></th>
					</tr>
				</thead>
			</table>
			<div className="table-scroll">
				<table className="courses-table">
					<tbody>
						{data.courses.map((course, key) => {
							if (
								key > 0 &&
								course.collection_id &&
								course.collection_id == data.courses[key - 1].collection_id
							) {
								collectionIndex++;
							} else {
								collectionIndex = 1;
							}
							return (
								<tr
									key={key}
									className={
										course.disabled
											? "courses-table-disabled-row"
											: "courses-table-row"
									}
								>
									<td
										className={`${
											course.disabled ? "courses-table-disabled-data" : ""
										} courses-table-data`}
										style={{ color: course.collection_id ? "red" : "black" }}
									>
										{course.code}{" "}
									</td>
									<td
										className={`${
											course.disabled ? "courses-table-disabled-data" : ""
										} courses-table-data`}
									>
										{course.name}
									</td>
									<td
										className={`${
											course.disabled ? "courses-table-disabled-data" : ""
										} courses-table-data`}
									>
										{course.credits}
									</td>
									<td
										className={`${
											course.disabled ? "courses-table-disabled-data" : ""
										} courses-table-data`}
									>
										{course.passed ? "Yes" : "No"}{" "}
									</td>
									<td className="courses-table-data">
										<input
											type="checkbox"
											checked={course.obligatory || checkedArray[key]}
											disabled={course.disabled}
											readOnly={course.obligatory}
											onChange={() => selectCourses(course, key)}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CoursesTable;
