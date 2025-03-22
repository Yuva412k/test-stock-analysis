import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';

export const Tools: React.FC = () => {
  const [principal, setPrincipal] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [result, setResult] = React.useState<number | null>(null);

  const calculateSIP = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const t = parseFloat(time) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      alert('Please enter valid numbers');
      return;
    }

    const amount = P * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
    setResult(amount);
  };

  return (
    <Card className="w-full bg-[#1b1a1a] rounded-[11px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-dove-gray50">Investment Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="principal">Monthly Investment (₹)</Label>
            <Input
              id="principal"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 5000"
            />
          </div>
          <div>
            <Label htmlFor="rate">Expected Annual Return (%)</Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 12"
            />
          </div>
          <div>
            <Label htmlFor="time">Investment Period (Years)</Label>
            <Input
              id="time"
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <Button onClick={calculateSIP}>Calculate SIP</Button>
          {result !== null && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-dove-gray50">Result:</h3>
              <p className="text-dove-gray100">
                Total Value: ₹{result.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
