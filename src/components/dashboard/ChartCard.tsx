
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResponsiveContainer } from 'recharts';

interface ChartCardProps {
  title: string;
  children: React.ReactNode; // Keep as ReactNode
  className?: string;
  height?: string;
}

const ChartCard = ({ title, children, className, height = "h-80" }: ChartCardProps) => {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={className}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={height}>
            <ResponsiveContainer width="100%" height="100%">
              {/* Use explicit casting to ReactElement to satisfy TypeScript */}
              {React.Children.only(children) as React.ReactElement}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ChartCard;
