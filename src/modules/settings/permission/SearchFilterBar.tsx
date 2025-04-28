
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { useLanguage } from '@/stores/language/LanguageContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFilterBarProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (activeOnly: boolean) => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  onSearch,
  onFilterChange
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder={t('common.search')}
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-8"
        />
      </div>
      <Collapsible
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        className="ml-2"
      >
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Filter className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute right-0 mt-2 w-64 rounded-md border bg-white p-4 shadow-md z-50">
          <div className="flex justify-between">
            <p className="font-medium">{t('common.filters')}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => setIsFilterOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            <div>
              <p className="mb-1 text-sm font-medium">{t('permission.position')}</p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('common.all')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff">Warehouse Staff</SelectItem>
                  <SelectItem value="picker">Picker</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">{t('permission.department')}</p>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('common.all')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">{t('permission.status')}</p>
              <Select onValueChange={(value) => onFilterChange(value === 'active')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('common.all')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="active">{t('permission.active')}</SelectItem>
                  <SelectItem value="inactive">{t('permission.inactive')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" className="mr-2">
                {t('common.reset')}
              </Button>
              <Button size="sm" className="bg-primary">
                {t('common.apply')}
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SearchFilterBar;
