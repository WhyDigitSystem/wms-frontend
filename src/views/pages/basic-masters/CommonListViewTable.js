import EditIcon from '@mui/icons-material/Edit';
import { Box, Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MaterialReactTable } from 'material-react-table';
import { useEffect, useState } from 'react';
import ActionButton from 'utils/ActionButton';

const CommonListViewTable = ({ data, columns, editCallback, countryVO, roleData, blockEdit, toEdit }) => {
  const [tableData, setTableData] = useState(data || []);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [orgId, setOrgId] = useState(localStorage.getItem('orgId'));

  const theme = useTheme();

  const chipSX = {
    height: 24,
    padding: '0 6px'
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: 28
  };

  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: '5px'
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
    setEditModalOpen(true);
    // setSelectedCountry(row.original.country);
  };

  const handleButtonClick = (row) => {
    if (blockEdit) {
      toEdit(row);
    } else {
      handleEditClick(row);
    }
  };

  useEffect(() => {
    console.log('BlockEdit', blockEdit);
  }, []);

  const customColumns = columns.map((column) => {
    if (column.accessorKey === 'active') {
      console.log('the columns are:', column);

      return {
        ...column,
        Cell: ({ cell }) => (
          <Chip
            label={cell.getValue() === 'Active' ? 'Active' : 'Inactive'}
            sx={cell.getValue() === 'Active' ? chipSuccessSX : chipErrorSX}
          />
        )
      };
    }

    if (column.accessorKey === 'currentFinYear') {
      console.log('the columns are:', column);

      return {
        ...column,
        Cell: ({ cell }) => (
          <Chip label={cell.getValue() === true ? 'true' : 'false'} sx={cell.getValue() === true ? chipSuccessSX : chipErrorSX} />
        )
      };
    }

    return column;
  });

  const renderRowActions = ({ row }) => (
    <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <ActionButton title="Edit" icon={EditIcon} onClick={() => handleButtonClick(row)} />
    </Box>
  );

  // const validateRequired = (value) => {
  //   return value !== '';
  // };

  // const getCommonEditTextFieldProps = (cell) => ({
  //   error: !!validationErrors[cell.id],
  //   helperText: validationErrors[cell.id],
  //   onBlur: (event) => {
  //     const isValid = validateRequired(event.target.value);
  //     if (!isValid) {
  //       setValidationErrors({
  //         ...validationErrors,
  //         [cell.id]: `${cell.column.columnDef.header} is required`
  //       });
  //     } else {
  //       delete validationErrors[cell.id];
  //       setValidationErrors({ ...validationErrors });
  //     }
  //   }
  // });

  // const handleCancelRowEdits = () => {
  //   setValidationErrors({});
  //   setEditModalOpen(false);
  //   setEditingRow(null);
  // };
  // const handleSaveRowEdits = async () => {
  //   if (!Object.keys(validationErrors).length) {
  //     const updatedRows = [...tableData];
  //     updatedRows[editingRow.index] = editingRow.original;
  //     setTableData(updatedRows);

  //     try {
  //       await editCallback(editingRow.original);
  //       setEditModalOpen(false);
  //       setEditingRow(null);
  //     } catch (error) {
  //       console.error('Error updating row:', error);
  //     }
  //   }
  // };

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center'
            },
            size: 120
          }
        }}
        columns={customColumns}
        data={tableData && tableData}
        enableColumnOrdering
        enableEditing
        renderRowActions={renderRowActions}
        renderTopToolbarCustomActions={() => <Stack direction="row" spacing={2} className="ml-5 "></Stack>}
      />
      {/* {editingRow && (
        <Dialog open={editModalOpen} onClose={handleCancelRowEdits}>
          <DialogTitle textAlign="center">
            <h6>Edit</h6>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={(e) => e.preventDefault()}>
              <Stack
                sx={{
                  width: '100%',
                  minWidth: { xs: '300px', sm: '360px', md: '400px' },
                  gap: '1rem',
                  marginTop: '10px'
                }}
              >
                {customColumns.map((column) => (
                  <Box key={column.accessorKey}>
                    {column.accessorKey === 'active' ? (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editingRow.original[column.accessorKey]}
                            onChange={(e) =>
                              setEditingRow({
                                ...editingRow,
                                original: {
                                  ...editingRow.original,
                                  [column.accessorKey]: e.target.checked
                                }
                              })
                            }
                          />
                        }
                        label={column.header}
                      />
                    ) : column.accessorKey === 'country' ? (
                      <FormControl fullWidth>
                        <InputLabel>{column.header}</InputLabel>
                        <Select
                          value={editingRow.original[column.accessorKey]}
                          onChange={(e) =>
                            setEditingRow({
                              ...editingRow,
                              original: {
                                ...editingRow.original,
                                [column.accessorKey]: e.target.value
                              }
                            })
                          }
                        >
                          {countryVO &&
                            countryVO.map((country) => (
                              <MenuItem key={country} value={country}>
                                {country}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    ) : column.accessorKey === 'state' ? (
                      <FormControl fullWidth>
                        <InputLabel>{column.header}</InputLabel>
                        <Select
                          value={editingRow.original[column.accessorKey]}
                          onChange={(e) =>
                            setEditingRow({
                              ...editingRow,
                              original: {
                                ...editingRow.original,
                                [column.accessorKey]: e.target.value
                              }
                            })
                          }
                        >
                          {stateVO &&
                            stateVO.map((state) => (
                              <MenuItem key={state} value={state}>
                                {state}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    ) : column.accessorKey === 'screenVO' ? (
                      <Box>
                        <InputLabel>{column.header}</InputLabel>
                        <Stack direction="row" spacing={1}>
                          {editingRow.original[column.accessorKey].map((screen) => (
                            <Chip key={screen.id} label={screen.screenName} />
                          ))}
                        </Stack>
                      </Box>
                    ) : (
                      <TextField
                        fullWidth
                        label={column.header}
                        name={column.accessorKey}
                        defaultValue={editingRow.original[column.accessorKey]}
                        onChange={(e) =>
                          setEditingRow({
                            ...editingRow,
                            original: {
                              ...editingRow.original,
                              [column.accessorKey]: e.target.value.toUpperCase()
                            }
                          })
                        }
                        {...getCommonEditTextFieldProps({
                          id: column.accessorKey
                        })}
                      />
                    )}
                  </Box>
                ))}
              </Stack>
            </form>
          </DialogContent>
          <DialogActions sx={{ p: '1.25rem' }}>
            <Button onClick={handleCancelRowEdits}>Cancel</Button>
            <Button color="secondary" onClick={handleSaveRowEdits} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )} */}
    </>
  );
};

export default CommonListViewTable;
