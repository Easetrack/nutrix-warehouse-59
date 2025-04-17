import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import { motion } from 'framer-motion'; // (optional: สำหรับ animation)

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = ['00', '15', '30', '45'];
const periods = ['AM', 'PM'] as const;

export default function TimePicker({
    onChange,
}: {
    onChange?: (value: string) => void;
}) {
    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState('30');
    const [period, setPeriod] = useState('AM');

    const selectedTime = `${hour}:${minute} ${period}`;

    // ส่งค่ากลับเมื่อเปลี่ยน
    const handleHourChange = (h: number) => {
        setHour(h);
        onChange?.(`${h}:${minute} ${period}`);
    };

    const handleMinuteChange = (m: string) => {
        setMinute(m);
        onChange?.(`${hour}:${m} ${period}`);
    };

    const handlePeriodChange = (p: 'AM' | 'PM') => {
        setPeriod(p);
        onChange?.(`${hour}:${minute} ${p}`);
    };

    return (
        <Popover.Root>
            <Popover.Trigger className="border text-start w-full text-sm px-4 py-2 rounded-xl shadow-sm bg-white dark:bg-background dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {selectedTime}
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    sideOffset={8}
                    className="z-50 rounded-2xl bg-white dark:bg-background shadow-xl p-4 w-[280px] animate-in fade-in zoom-in"
                >
                    <div className="grid grid-cols-3 gap-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                        <div>Hour</div>
                        <div>Minute</div>
                        <div>AM/PM</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="max-h-40 overflow-y-auto flex flex-col items-center space-y-1">
                            {hours.map((h) => (
                                <button
                                    key={h}
                                    onClick={() => handleHourChange(h)}
                                    className={`w-12 py-1 rounded-md text-sm transition-colors ${hour === h
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-blue-100 dark:hover:bg-blue-900'
                                        } focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500`}
                                >
                                    {h}
                                </button>
                            ))}
                        </div>

                        <div className="max-h-40 overflow-y-auto flex flex-col items-center space-y-1">
                            {minutes.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => handleMinuteChange(m)}
                                    className={`w-12 py-1 rounded-md text-sm transition-colors ${minute === m
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-blue-100 dark:hover:bg-blue-900'
                                        } focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col items-center space-y-1">
                            {periods.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => handlePeriodChange(p)}
                                    className={`w-12 py-1 rounded-md text-sm transition-colors ${period === p
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-blue-100 dark:hover:bg-blue-900'
                                        } focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
