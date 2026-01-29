"use client";

import { ChevronRight } from "lucide-react";
import Select, { components } from "react-select";
import { useState } from "react";
import addressData from "../public/bangladesh-data.json";

/* eslint-disable */

export default function AddressSelect({
    selectedDistrict,
    setSelectedDistrict,
    selectedCity,
    setSelectedCity,
    cityId,
    setCityId,
    zoneId,
    setZoneId,
}) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [expandedState, setExpandedState] = useState(null);

    // Build options list
    const options = Object.entries(addressData.country_states).flatMap(
        ([stateId, stateName]) => {
            const stateOption = {
                value: stateId,
                label: stateName,
                type: "state",
                stateId,
                stateName,
            };

            const cities =
                Object.entries(addressData.country_cities[stateId] || {}).map(
                    ([cityIdVal, cityName]) => ({
                        value: `${stateId}-${cityIdVal}`,
                        label: `${stateName} → ${cityName}`,
                        type: "city",
                        stateId,
                        cityId: cityIdVal,
                        stateName,
                        cityName,
                    })
                );

            return [stateOption, ...cities];
        }
    );

    // Custom option renderer
    const Option = (props) => (
        <components.Option {...props}>
            {props.data.type === "state" ? (
                <div className="flex w-full items-center justify-between font-bold text-gray-800">
                    <span>{props.data.label} (District)</span>
                    <ChevronRight size={16} />
                </div>
            ) : (
                <span className="pl-4 text-gray-600">{props.data.label}</span>
            )}
        </components.Option>
    );

    // Handle selection
    const handleChange = (selectedOptions) => {
        const last = selectedOptions?.[selectedOptions.length - 1];

        if (!last) {
            setSelectedDistrict(null);
            setSelectedCity(null);
            if (setCityId) setCityId(null);
            if (setZoneId) setZoneId(null);
            setExpandedState(null);
            return;
        }

        // When district is clicked — expand cities
        if (last.type === "state") {
            setSelectedDistrict(last.stateName);
            setSelectedCity(null);
            if (setCityId) setCityId(null);
            if (setZoneId) setZoneId(last.stateId);
            // Toggle expansion
            setExpandedState(last.stateId === expandedState ? null : last.stateId);
            setMenuIsOpen(true); // Keep menu open to pick city
        }

        // When city is clicked
        if (last.type === "city") {
            setSelectedDistrict(last.stateName);
            setSelectedCity(last.cityName);
            if (setCityId) setCityId(last.cityId);
            if (setZoneId) setZoneId(last.stateId);
            setExpandedState(null);
            setMenuIsOpen(false);
        }
    };

    // Filter: show states OR the expanded state's cities
    const filterOption = (option, input) => {
        const data = option.data;

        // Search Mode
        if (input) {
            return option.label.toLowerCase().includes(input.toLowerCase());
        }

        // Browse Mode
        if (expandedState) {
            // If a state is expanded, show that state (header) AND its cities
            if (data.type === "state" && data.stateId === expandedState) return true;
            if (data.type === "city" && data.stateId === expandedState) return true;
            return false;
        }

        // Default: Show only states
        return data.type === "state";
    };

    // Format controlled value for Select
    const getValue = () => {
        if (selectedDistrict && selectedCity) {
            return [
                {
                    value: `${selectedDistrict}-${selectedCity}`,
                    label: `${selectedDistrict} → ${selectedCity}`,
                    type: "combined",
                },
            ];
        }

        if (selectedDistrict) {
            return [
                {
                    value: selectedDistrict,
                    label: selectedDistrict,
                    type: "state",
                },
            ];
        }

        return [];
    };

    return (
        <div className="cursor-pointer relative z-50">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
                Select Address <span className="text-red-500">*</span>
            </label>

            <Select
                className="text-black text-sm"
                options={options}
                components={{ Option }}
                value={getValue()}
                onChange={handleChange}
                isMulti
                isClearable
                menuIsOpen={menuIsOpen}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                closeMenuOnSelect={false}
                filterOption={filterOption}
                placeholder="Select District → Area"
                styles={{
                    control: (base, state) => ({
                        ...base,
                        padding: '2px',
                        borderRadius: '0.5rem',
                        borderColor: state.isFocused ? '#FCB042' : '#e5e7eb',
                        boxShadow: state.isFocused ? '0 0 0 1px #FCB042' : 'none',
                        fontSize: '16px',
                        backgroundColor: '#f9fafb',
                        '&:hover': {
                            borderColor: '#d1d5db'
                        }
                    }),
                    input: (base) => ({
                        ...base,
                        fontSize: '16px',
                    }),
                    placeholder: (base) => ({
                        ...base,
                        fontSize: '16px',
                        color: '#9ca3af',
                    }),
                    singleValue: (base) => ({
                        ...base,
                        fontSize: '16px',
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#FCB042/10',
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 100,
                    }),
                }}
            />
        </div>
    );
}
